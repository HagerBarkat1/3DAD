# شرح تفصيلي لأكواد مشروع 3DAD

يا هلا يا صاحبي! 👋 

الملف ده هيشرح كل سطر في الكود بتاع مشروع 3DAD بالتفصيل الممل وباللغة العامية المصرية. هنشرح كل حاجة من الصفر خالص عشان حتى لو انت مش فاهم أي حاجة في البرمجة، تقدر تفهم المشروع ده ماشي إزاي.

## الفهرس

1. [مقدمة عن المشروع](#مقدمة-عن-المشروع)
2. [هيكل المشروع](#هيكل-المشروع)
3. [شرح ملفات المشروع الرئيسية](#شرح-ملفات-المشروع-الرئيسية)
4. [شرح ملفات الصفحات](#شرح-ملفات-الصفحات)
5. [شرح ملفات الخدمات](#شرح-ملفات-الخدمات)
6. [كيفية عمل المشروع بالتفصيل](#كيفية-عمل-المشروع-بالتفصيل)

## مقدمة عن المشروع

مشروع 3DAD هو تطبيق ويب بيستخدم تقنيات الذكاء الاصطناعي عشان يكتشف الاستهلاك الغير طبيعي للكهرباء. الفكرة إن التطبيق بياخد بيانات زي درجة الحرارة والرطوبة وسرعة الرياح واستهلاك الكهرباء، وبيحللها عشان يقولك إذا كان الاستهلاك ده طبيعي ولا لأ.

## هيكل المشروع

المشروع مبني باستخدام React.js، وهي مكتبة جافاسكريبت بتساعدنا نبني واجهات المستخدم بطريقة سهلة وسريعة. خلينا نفهم الأول يعني إيه React.js:

### يعني إيه React.js؟

React.js هي مكتبة جافاسكريبت اخترعتها شركة فيسبوك (ميتا حالياً) عشان تسهل بناء واجهات المستخدم. الفكرة الأساسية في React هي إن الصفحة بتتقسم لمكونات (Components) صغيرة، وكل مكون بيكون مسؤول عن جزء معين من الصفحة.

مثلاً، في تطبيقنا عندنا مكونات زي:
- مكون الصفحة الرئيسية
- مكون تسجيل الدخول
- مكون إنشاء حساب
- مكون لوحة التحكم

كل مكون بيتكون من:
1. **JSX**: ده كود بيشبه HTML بس بنكتبه جوا ملف جافاسكريبت، وبيوصف شكل المكون
2. **JavaScript**: ده الكود اللي بيتحكم في سلوك المكون
3. **CSS**: ده الكود اللي بيتحكم في مظهر المكون

## شرح ملفات المشروع الرئيسية

### 1. package.json

ده أول ملف لازم تفهمه في أي مشروع React. الملف ده بيحتوي على:

```json
{
  "name": "landing-page-template",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.8.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

**شرح بالعامية:**
- **name**: ده اسم المشروع
- **version**: ده رقم الإصدار
- **dependencies**: دي المكتبات اللي المشروع بيستخدمها:
  - **react**: المكتبة الأساسية
  - **react-dom**: بتساعد React تتعامل مع DOM (يعني صفحة الويب)
  - **react-router-dom**: بتساعدنا ننتقل بين الصفحات المختلفة
  - **react-scripts**: بتوفر أوامر زي start و build
- **scripts**: دي الأوامر اللي ممكن نشغلها:
  - **start**: بيشغل المشروع في وضع التطوير
  - **build**: بيجهز المشروع للنشر

### 2. index.js

ده نقطة البداية في أي مشروع React. لما بتشغل المشروع، أول ملف بيتنفذ هو ده:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
```

**شرح بالعامية:**
- **import**: دي كلمة بنستخدمها عشان نجيب مكتبات أو ملفات تانية نستخدمها في الملف ده
- **ReactDOM.createRoot**: دي بتحدد فين هيتعرض التطبيق في صفحة HTML (في العنصر اللي id بتاعه 'root')
- **root.render**: دي بتعرض التطبيق
- **BrowserRouter**: ده مكون من react-router-dom بيسمح لنا ننتقل بين الصفحات
- **App**: ده المكون الرئيسي للتطبيق
- **React.StrictMode**: ده بيساعد في اكتشاف المشاكل المحتملة في التطبيق

### 3. App.js

ده المكون الرئيسي للتطبيق، وبيحتوي على كل المسارات والصفحات:

```jsx
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { isAuthenticated, getCurrentUser, logoutUser } from './services/authService';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication status when app loads
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    }
  }, []);
  
  // ... باقي الكود
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
```

**شرح بالعامية:**
- **useState**: دي وظيفة (function) بتسمح لنا نخزن ونغير بيانات في المكون
  - **showScrollTop**: متغير بيتحكم في ظهور زر التمرير لأعلى
  - **user**: متغير بيخزن بيانات المستخدم الحالي
- **useNavigate**: دي وظيفة بتسمح لنا ننتقل بين الصفحات
- **useEffect**: دي وظيفة بتنفذ كود معين في أوقات محددة:
  - المرة الأولى: بتتحقق إذا كان المستخدم مسجل دخول
  - المرة التانية: بتراقب التمرير في الصفحة
- **Routes و Route**: دول مكونات بتحدد مسارات التطبيق:
  - **/** للصفحة الرئيسية
  - **/login** لصفحة تسجيل الدخول
  - **/signup** لصفحة إنشاء حساب
  - **/dashboard** للوحة التحكم

## شرح ملفات الصفحات

### 1. Login.js

ده ملف صفحة تسجيل الدخول:

```jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  
  // ... باقي الكود
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginUser(
      { email: formData.email, password: formData.password },
      formData.rememberMe
    );
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    // JSX للصفحة
  );
};

export default Login;
```

**شرح بالعامية:**
- **formData**: ده متغير بيخزن بيانات النموذج (الإيميل وكلمة المرور وخيار "تذكرني")
- **error**: ده متغير بيخزن رسالة الخطأ لو في مشكلة
- **handleChange**: دي وظيفة بتتنفذ لما المستخدم يكتب في أي حقل
  - **...formData**: دي طريقة لنسخ كل البيانات القديمة
  - **[name]: value**: دي طريقة لتحديث قيمة واحدة بس
- **handleSubmit**: دي وظيفة بتتنفذ لما المستخدم يضغط على زر تسجيل الدخول
  - **e.preventDefault()**: دي بتمنع السلوك الافتراضي للنموذج (إعادة تحميل الصفحة)
  - **loginUser**: دي وظيفة من authService بتتحقق من بيانات المستخدم
  - **navigate('/dashboard')**: دي بتنقل المستخدم للوحة التحكم لو نجح تسجيل الدخول

### 2. SignUp.js

ده ملف صفحة إنشاء حساب:

```jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/authService';
import './Login.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  // ... باقي الكود
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    // Register user
    const result = registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      // Auto login after successful registration
      const loginResult = loginUser({
        email: formData.email,
        password: formData.password
      });
      
      if (loginResult.success) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    // JSX للصفحة
  );
};

export default SignUp;
```

**شرح بالعامية:**
- **formData**: ده متغير بيخزن بيانات النموذج (الاسم والإيميل وكلمة المرور وتأكيد كلمة المرور)
- **handleSubmit**: دي وظيفة بتتنفذ لما المستخدم يضغط على زر إنشاء حساب
  - أول حاجة بتتأكد إن كلمة المرور وتأكيدها متطابقين
  - بعدين بتستدعي وظيفة **registerUser** من authService لتسجيل المستخدم
  - لو نجح التسجيل، بتحاول تسجل دخول المستخدم تلقائي باستخدام **loginUser**
  - لو نجح تسجيل الدخول، بتنقل المستخدم للوحة التحكم

### 3. Dashboard.js

ده ملف لوحة التحكم، وهو أكبر ملف في المشروع:

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, updateUser } from '../services/authService';
import { predictWithModel, loadModel } from '../services/mlModelService';
import usePredictionService from '../services/predictionService';
import './Dashboard.css';

// User Info Modal Component
const UserInfoModal = ({ user, onClose, onSave }) => {
  // ... كود مربع حوار معلومات المستخدم
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showInputForm, setShowInputForm] = useState(true);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    hour: '',
    weekday: '',
    electricity_consumed: '',
    temperature: '',
    humidity: '',
    wind_speed: '',
    avg_past_consumption: ''
  });
  
  // ... باقي الكود
  
  const handlePrediction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Convert form data to appropriate format
      const inputData = {
        hour: parseInt(formData.hour),
        weekday: parseInt(formData.weekday),
        electricity_consumed: parseFloat(formData.electricity_consumed),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        wind_speed: parseFloat(formData.wind_speed),
        avg_past_consumption: parseFloat(formData.avg_past_consumption)
      };
      
      // Make prediction
      const result = await predictWithModel(inputData);
      
      if (result.success) {
        setPredictionResult(result);
        setShowInputForm(false);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // JSX للوحة التحكم
  );
};

export default Dashboard;
```

**شرح بالعامية:**
- **UserInfoModal**: ده مكون فرعي بيظهر مربع حوار لتعديل معلومات المستخدم
- **Dashboard**: ده المكون الرئيسي للوحة التحكم
  - **user**: ده متغير بيخزن بيانات المستخدم الحالي
  - **showUserInfo**: ده متغير بيتحكم في ظهور مربع حوار معلومات المستخدم
  - **showInputForm**: ده متغير بيتحكم في ظهور نموذج إدخال البيانات
  - **predictionResult**: ده متغير بيخزن نتيجة التنبؤ
  - **formData**: ده متغير بيخزن بيانات النموذج (الساعة واليوم واستهلاك الكهرباء إلخ)
- **handlePrediction**: دي وظيفة بتتنفذ لما المستخدم يضغط على زر التنبؤ
  - بتحول البيانات من نصوص لأرقام باستخدام parseInt و parseFloat
  - بتستدعي وظيفة **predictWithModel** من mlModelService للتنبؤ
  - بتعرض النتيجة وتخفي نموذج الإدخال

## شرح ملفات الخدمات

### 1. authService.js

ده ملف خدمة المصادقة، وبيتعامل مع تسجيل المستخدمين وتسجيل الدخول:

```jsx
// Simple authentication service using localStorage

const AUTH_KEY = '3dad_auth_data';
const USERS_KEY = '3dad_users';

// Initialize users array if it doesn't exist
const initUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

// Register a new user
export const registerUser = (userData) => {
  initUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    return { success: false, message: 'Email is already registered' };
  }
  
  // Add new user
  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true, message: 'Account created successfully' };
};

// Login user
export const loginUser = (credentials, rememberMe = false) => {
  // ... كود تسجيل الدخول
};

// Check if user is logged in
export const isAuthenticated = () => {
  // ... كود التحقق من تسجيل الدخول
};

// Get current user
export const getCurrentUser = () => {
  // ... كود الحصول على المستخدم الحالي
};

// Update user information
export const updateUser = (userId, updatedInfo) => {
  // ... كود تحديث معلومات المستخدم
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
};
```

**شرح بالعامية:**
- **localStorage**: دي طريقة لتخزين بيانات في المتصفح، بتفضل موجودة حتى بعد إغلاق المتصفح
- **AUTH_KEY و USERS_KEY**: دول مفاتيح بنستخدمها لتخزين البيانات في localStorage
- **initUsers**: دي وظيفة بتتأكد إن مصفوفة المستخدمين موجودة في localStorage
- **registerUser**: دي وظيفة بتسجل مستخدم جديد
  - بتتحقق الأول إذا كان الإيميل مستخدم قبل كده
  - بتضيف المستخدم الجديد للمصفوفة وتحفظها في localStorage
- **loginUser**: دي وظيفة بتسجل دخول المستخدم
  - بتدور على المستخدم في المصفوفة
  - بتنشئ جلسة وتحفظها في localStorage
- **isAuthenticated**: دي وظيفة بتتحقق إذا كان المستخدم مسجل دخول
  - بتتحقق من وجود بيانات الجلسة في localStorage
  - بتتحقق إذا كانت الجلسة منتهية
- **getCurrentUser**: دي وظيفة بتجيب بيانات المستخدم الحالي من localStorage
- **updateUser**: دي وظيفة بتحدث بيانات المستخدم
- **logoutUser**: دي وظيفة بتمسح بيانات الجلسة من localStorage

### 2. mlModelService.js

ده ملف خدمة نموذج التعلم الآلي، وبيتعامل مع تحميل النموذج والتنبؤ:

```jsx
// This service handles loading and using the ML model

// Function to load the ML model
const loadModel = async () => {
  try {
    // In a real implementation, this would load the model from the server
    console.log('Loading ML model from: src/models/best.pkl');
    return { success: true, message: 'Model loaded successfully' };
  } catch (error) {
    console.error('Error loading model:', error);
    return { success: false, error: error.message };
  }
};

// Function to make a prediction using the loaded model
const predictWithModel = async (inputData) => {
  try {
    // Validate input data
    validateInputData(inputData);
    
    // In a real implementation, this would use the loaded model to make a prediction
    // For now, we'll use a simple algorithm that mimics the model's behavior
    
    // Use inputs directly since they are already in 0-1 range (except hour and weekday)
    const normalizedData = {
      hour: inputData.hour / 23, // Normalize to 0-1 range
      weekday: inputData.weekday / 6, // Normalize to 0-1 range
      electricity_consumed: inputData.electricity_consumed, // Already in 0-1 range
      temperature: inputData.temperature, // Already in 0-1 range
      humidity: inputData.humidity, // Already in 0-1 range
      wind_speed: inputData.wind_speed, // Already in 0-1 range
      avg_past_consumption: inputData.avg_past_consumption // Already in 0-1 range
    };
    
    // Simple algorithm to mimic model prediction
    const anomalyScore = (
      (normalizedData.electricity_consumed > normalizedData.avg_past_consumption * 1.2 ? 0.4 : 0) +
      (normalizedData.hour >= 0.8 || normalizedData.hour <= 0.3 ? 0.2 : 0) + // Late night or early morning
      (normalizedData.temperature > 0.8 || normalizedData.temperature < 0.1 ? 0.2 : 0) + // Extreme temperatures
      (normalizedData.humidity > 0.9 || normalizedData.humidity < 0.2 ? 0.1 : 0) + // Extreme humidity
      (normalizedData.wind_speed > 0.7 ? 0.1 : 0) + // High wind speed
      Math.random() * 0.3 // Random factor to add variability
    );
    
    // Determine prediction (0 = normal, 1 = anomaly)
    const prediction = anomalyScore > 0.6 ? 1 : 0;
    
    return {
      success: true,
      prediction: prediction,
      confidence: prediction === 1 ? anomalyScore : 1 - anomalyScore,
      input: inputData
    };
  } catch (error) {
    console.error('Prediction error:', error);
    return { success: false, error: error.message };
  }
};

// Validate input data
const validateInputData = (data) => {
  // ... كود التحقق من البيانات
};

export { loadModel, predictWithModel };
```

**شرح بالعامية:**
- **loadModel**: دي وظيفة بتحمل نموذج التعلم الآلي (في الحقيقة هنا بس بتتظاهر إنها بتحمل النموذج)
- **predictWithModel**: دي وظيفة بتستخدم النموذج للتنبؤ
  - بتتحقق الأول من صحة البيانات باستخدام **validateInputData**
  - بتطبع البيانات لتكون في نطاق 0-1
  - بتحسب درجة الشذوذ (anomalyScore) باستخدام خوارزمية بسيطة:
    - لو الاستهلاك أكبر من المتوسط بـ 20%، بتضيف 0.4
    - لو الوقت متأخر في الليل أو مبكر في الصباح، بتضيف 0.2
    - لو درجة الحرارة متطرفة، بتضيف 0.2
    - لو الرطوبة متطرفة، بتضيف 0.1
    - لو سرعة الرياح عالية، بتضيف 0.1
    - بتضيف عامل عشوائي بين 0 و 0.3
  - بتحدد التنبؤ: لو درجة الشذوذ أكبر من 0.6، يبقى في شذوذ (1)، غير كده طبيعي (0)
- **validateInputData**: دي وظيفة بتتحقق من صحة البيانات المدخلة

### 3. predictionService.js

ده ملف خدمة التنبؤ، وبيوفر واجهة سهلة للتعامل مع عملية التنبؤ:

```jsx
import { useState, useEffect } from 'react';

// This service handles the prediction functionality using the ML model
const usePredictionService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to make prediction using the ML model
  const makePrediction = async (inputData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Prepare the input data for the model
      const modelInput = {
        hour: inputData.hour,
        weekday: inputData.weekday,
        electricity_consumed: inputData.electricity_consumed,
        temperature: inputData.temperature,
        humidity: inputData.humidity,
        wind_speed: inputData.wind_speed,
        avg_past_consumption: inputData.avg_past_consumption
      };

      // Make a request to the backend API (simulated here)
      const response = await simulatePredictionRequest(modelInput);
      
      setPredictionResult(response.prediction);
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred during prediction');
      return { success: false, error: err.message };
    } finally {
      // Add a delay to simulate processing time for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  // This function simulates a backend request
  const simulatePredictionRequest = async (modelInput) => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // For now, generate a random prediction between 0 and 1
        const randomPrediction = Math.random() > 0.5 ? 1 : 0;
        
        resolve({
          success: true,
          prediction: randomPrediction,
          confidence: Math.random() * 0.5 + 0.5, // Random confidence between 0.5 and 1
          input: modelInput
        });
      }, 1000);
    });
  };

  return {
    isLoading,
    predictionResult,
    error,
    makePrediction,
    resetPrediction: () => {
      setPredictionResult(null);
      setError(null);
    }
  };
};

export default usePredictionService;
```

**شرح بالعامية:**
- **usePredictionService**: ده Hook مخصص (Custom Hook) بيوفر وظائف التنبؤ
  - **isLoading**: متغير بيوضح إذا كان التنبؤ جاري
  - **predictionResult**: متغير بيخزن نتيجة التنبؤ
  - **error**: متغير بيخزن أي خطأ يحصل
- **makePrediction**: دي وظيفة بتعمل التنبؤ
  - بتجهز البيانات للنموذج
  - بتستدعي **simulatePredictionRequest** لمحاكاة طلب للخادم الخلفي
  - بتخزن النتيجة وترجعها
- **simulatePredictionRequest**: دي وظيفة بتحاكي طلب للخادم الخلفي
  - بتستخدم Promise عشان تحاكي طلب غير متزامن (asynchronous)
  - بتضيف تأخير لمحاكاة تأخير الشبكة
  - بترجع تنبؤ عشوائي (0 أو 1) ودرجة ثقة عشوائية
- **resetPrediction**: دي وظيفة بتعيد تعيين نتيجة التنبؤ والخطأ

## كيفية عمل المشروع بالتفصيل

خلينا نشوف دلوقتي المشروع بيشتغل إزاي من البداية للنهاية:

### 1. بداية التطبيق

1. لما بتفتح التطبيق، أول ملف بيتنفذ هو **index.js**
2. **index.js** بيحمل المكون الرئيسي **App** جوا **BrowserRouter**
3. **App** بيتحقق إذا كان المستخدم مسجل دخول باستخدام **isAuthenticated** من **authService**
4. لو المستخدم مسجل دخول، بيحمل بياناته باستخدام **getCurrentUser**
5. **App** بيعرض المكون المناسب حسب المسار:
   - **/** للصفحة الرئيسية
   - **/login** لصفحة تسجيل الدخول
   - **/signup** لصفحة إنشاء حساب
   - **/dashboard** للوحة التحكم

### 2. تسجيل مستخدم جديد

1. المستخدم بيدخل على صفحة إنشاء حساب (**SignUp**)
2. بيدخل الاسم والإيميل وكلمة المرور وتأكيد كلمة المرور
3. لما بيضغط على زر التسجيل، بتتنفذ وظيفة **handleSubmit**
4. الوظيفة بتتحقق إن كلمة المرور وتأكيدها متطابقين
5. بتستدعي **registerUser** من **authService** لتسجيل المستخدم
6. **registerUser** بتتحقق إن الإيميل مش مستخدم قبل كده
7. بتضيف المستخدم الجديد لمصفوفة المستخدمين في **localStorage**
8. بعد التسجيل بنجاح، بتستدعي **loginUser** لتسجيل دخول المستخدم تلقائي
9. بتنقل المستخدم للوحة التحكم

### 3. تسجيل الدخول

1. المستخدم بيدخل على صفحة تسجيل الدخول (**Login**)
2. بيدخل الإيميل وكلمة المرور
3. لما بيضغط على زر تسجيل الدخول، بتتنفذ وظيفة **handleSubmit**
4. بتستدعي **loginUser** من **authService**
5. **loginUser** بتدور على المستخدم في مصفوفة المستخدمين
6. لو لقت المستخدم وكلمة المرور صح، بتنشئ جلسة وتخزنها في **localStorage**
7. بتنقل المستخدم للوحة التحكم

### 4. استخدام لوحة التحكم

1. المستخدم بيدخل على لوحة التحكم (**Dashboard**)
2. **Dashboard** بتحمل بيانات المستخدم باستخدام **getCurrentUser**
3. المستخدم بيدخل بيانات الاستهلاك والظروف المحيطة:
   - الساعة (0-23)
   - اليوم (0-6، حيث 0 هو الأحد)
   - استهلاك الكهرباء (0-1)
   - درجة الحرارة (0-1)
   - الرطوبة (0-1)
   - سرعة الرياح (0-1)
   - متوسط الاستهلاك السابق (0-1)
4. لما بيضغط على زر التنبؤ، بتتنفذ وظيفة **handlePrediction**
5. بتحول البيانات من نصوص لأرقام
6. بتستدعي **predictWithModel** من **mlModelService**
7. **predictWithModel** بتتحقق من صحة البيانات
8. بتحسب درجة الشذوذ باستخدام خوارزمية بسيطة
9. بتحدد التنبؤ: لو درجة الشذوذ أكبر من 0.6، يبقى في شذوذ (1)، غير كده طبيعي (0)
10. بترجع النتيجة للوحة التحكم
11. لوحة التحكم بتعرض النتيجة للمستخدم

### 5. تسجيل الخروج

1. المستخدم بيضغط على زر تسجيل الخروج
2. بتتنفذ وظيفة **handleLogout** في **App**
3. بتستدعي **logoutUser** من **authService**
4. **logoutUser** بتمسح بيانات الجلسة من **localStorage**
5. بتنقل المستخدم للصفحة الرئيسية

## خلاصة

كده شرحنا كل سطر في الكود بتاع مشروع 3DAD بالتفصيل الممل وباللغة العامية المصرية. المشروع ده بيستخدم React.js لبناء واجهة المستخدم، وبيخزن البيانات في localStorage، وبيحاكي نموذج تعلم آلي للتنبؤ بالاستهلاك الغير طبيعي للكهرباء.

المشروع مقسم لعدة أجزاء:
1. **المكونات الرئيسية**: App, HomePage, Login, SignUp, Dashboard
2. **الخدمات**: authService, mlModelService, predictionService

كل جزء له دور محدد، وكلهم بيشتغلوا مع بعض عشان يوفروا تجربة مستخدم سلسة وفعالة.

أتمنى إن الشرح ده يكون ساعدك تفهم المشروع كويس، وتقدر تطوره أو تستخدمه كأساس لمشاريع تانية.

---

**ملاحظة**: المشروع ده هو نموذج تعليمي وليس منتج جاهز للاستخدام التجاري. في مشروع حقيقي، هتحتاج تستبدل محاكاة نموذج التعلم الآلي بنموذج حقيقي، وتستبدل localStorage بقاعدة بيانات حقيقية، وتضيف طبقات أمان أكتر.