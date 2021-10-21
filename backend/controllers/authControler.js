////const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
//const config = require('config');
//const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail ,sendUpdatePassw} = require('../utils/mail');


const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { reset } = require('../services/auth.service');
const {
  createRefreshToken,
  createToken,
  verifyPassword,
} = require('../utils/helper');

const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Пожалуйста введите e-mail и пароль!', 400));
  }
  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(
      new AppError(
        'Ошибка аутентификации. Пользователь или пароль неверны.',
        403
      )
    );
  }

  if (!user.isConfirm) {
    return next(
      new AppError(
        'Ошибка аутентификации 2. Пользователь или пароль неверны.',
        403
      )
    );
  }

  user.refreshToken = createRefreshToken({ email: email });

  const passwordValid = await verifyPassword(password, user.password);
  if (!passwordValid) {
    return next(
      new AppError(
        'Ошибка аутентификации. Пользователь или пароль неверны.',
        403
      )
    );
  }

  const { admin } = user;
  user.refreshToken = createRefreshToken({ email: email });
  const savedUser = await user.save();
 
  if (savedUser) {
    res.json({
      name :savedUser.username ,
      token: createToken(savedUser),
      refreshToken: savedUser.refreshToken,
     
    });
  } else {
    return next(
      new AppError(
        'Ошибка аутентификации. Пользователь или пароль неверны.',
        409
      )
    );
  }
});

const signup = catchAsync(async (req, res, next) => {
  const { username, email, firstName, lastName, password } = req.body;
  const foundUser = await User.findOne(
    { email: email, isConfirm: true },
    'email'
  );
  if (foundUser) {
    return next(new AppError('Пользователь существует .', 409));
  }

  const newUser = new User({
    username,
    email,
    firstName,
    lastName,
    password,
    confirmAccountTokenExpires:
      Date.now() + parseInt(process.env.tokenExpires, 10),
  });

  newUser.refreshToken = createRefreshToken();
  newUser.isConfirm = false;
  const result = await newUser.save();
  

  await sendVerificationEmail(
    process.env.from,
    email,
    username,
    result.refreshToken
  );
  
  res.json({
    token: createToken(result),
    refreshToken: result.refreshToken,
    name: result.name,
  });
});

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

 
  if (!token) {
    return next(
      new AppError(
        'Вы не авторизованы! Пожалуйста, авторизуйтесь, чтобы получить доступ.',
        401
      )
    );
  }
 
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  

 
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError(
        'Пользователь, принадлежащий к этому токену, больше не существует.',
        401
      )
    );
  }
 
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

const verifymail = catchAsync(async (req, res, next) => {
  const { email ,token } = req.body;

  const refreshToken = token;
 
  const foundUser = await User.findOne({
    email :email,
    refreshToken: refreshToken,
    confirmAccountTokenExpires: { $gt: Date.now() },
  });


    if (!foundUser) {
          return next(  new AppError('Токен протух .', 401 ));
    }
    
    const UserUpdate = await User.findOneAndUpdate({_id: foundUser._id, }, { $set: { isConfirm: true } } );
    UserUpdate.refreshToken = createRefreshToken({ email: email });
    if (UserUpdate) {
      res.json({
                token: createToken(UserUpdate),
                refreshToken: refreshToken,
                success: true,
              });
    } else {
      return next( new AppError('Ошибка  при  активации учетной записи.', 401 )  );
    }
  
  
});
/*
const resendVerification = async (req, res, next) => {
  const { email } = req.body;

  const foundUser = await User.findOne({ email }, (err, user) => {
    if (foundUser) {
      return res.status(401).json({
        success: false,
        token: refreshToken,
        message: 'Токен протух ',
      });
    }
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const UserUpdate = await User.findOneAndUpdate(
      {
        _id: foundUser._id,
      },
      { $set: { confirmAccountTokenExpires: tomorrow } }
    );

    if (UserUpdate) {
      res.json({
        message: 'Welcome-3',
        token: createToken(UserUpdate),
        refreshToken: refreshToken,
        success: true,
      });
    } else {
      res.status(409).json({
        success: false,
        message: 'Ошибка аутентификации',
      });
    }
  } catch (err) {
    res.json({ message: err });
  }

  try {
    await sendVerificationEmail(
      process.env.from,
      email,
      username,
      result.refreshToken
    );

    res.json({
      message: 'Welcome-1',
      token: createToken(result),
      refreshToken: result.refreshToken,
      name: result.name,
    });
  } catch (err) {
    res.json({ message: err });
  }
};
*/
const refreshToken = catchAsync(async (req, res, next) => {
 
  if (!req.body.token) {
    return next(new AppError('Не найден токен!Авторизуйтесь снова ', 401));
  }
  
 
  const user = await User.findOne(
    {
      refreshToken: req.body.token,
    },
    [ 'email', 'username']
  );
  

  if (user) {
    user.refreshToken = createRefreshToken({ email: user.email });
    await user.save();
    res.status(201).json({
      token: createToken(user),
      refreshToken: user.refreshToken,
      name: user.username
    });
  } else {
      
    return next( new AppError('Срок действия вашего токена истек!', 401 )  );
 
   

  }
});

 const forgot = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  
     
      const user = await User.findOne({ email: email.toString() });
      if (!user) {
        return next(  new AppError('Нет такого email .', 401 ));
      }
    
      user.refreshToken = createRefreshToken(user.id);
      user.isConfirm = false;
      const result = await user.save();
             
        await sendUpdatePassw(
          process.env.from,
          result.email,
          result.username,
          result.refreshToken
        );
      
       
        res.status(201).json({
          refreshToken: result.refreshToken,
          name: result.name,
        });
      

});
 const setpassword = catchAsync(async (req, res, next) => {
  const { passwordnew, token } = req.body;

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  if (!decoded) {
    return next(  new AppError('Неправильный токен .Попробуйте еще раз', 401 ));
  }
   const currentUser = await User.findById(decoded.data);
   if (!currentUser) {
    return next(  new AppError('Пользователь не найден .', 401 ));
  }
  
    console.log('0-4:'  )
    currentUser.password = passwordnew
    currentUser.isConfirm = true
    const result = await currentUser.save();
   
   if (!result) {
    return next(  new AppError('Ошибка при сбросе пароля .', 401 ));
  }
    
 
  res.status(201).json({
    
    message: "Пароль успешно сброшен"
  });
});
  


   /*

    if (new Date() > user.confirmAccountTokenExpires.expires) {
      return res.status(422).send({
        error: {
          message:
            "Cсылка уже истекла, пожалуйста, запросите сброс пароля еще раз",
          resend: true
        }
      });
    }

    if (token !== user.refreshToken) {
      return res.status(422).send({
        error: {
          message:
            "что-то пошло не так, пожалуйста, запросите сброс пароля еще раз",
          resend: true
        }
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      // const salt = bcrypt.genSaltSync(10);

      const passwordn = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      User.findByIdAndUpdate(user.id, { password: passwordn }, (err) => {
        if (err) {
          return next(err);
        }

        const { username } = user;

        res.json({
          username: username,
          message: "Пароль успешно сброшен"
        });
      });
    });
  });

  */


module.exports = {
  signin,
  signup,
  protect,
  verifymail,
  refreshToken,
  forgot ,
  setpassword

};
