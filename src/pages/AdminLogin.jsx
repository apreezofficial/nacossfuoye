import { useState } from 'react';
import supabase from '../services/supabaseClient';
import { useNavigate } from "react-router-dom";

function LoginForm() {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });

   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
         ...prevState,
         [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
         setErrors(prev => ({ ...prev, [name]: '' }));
      }
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.email.trim()) {
         newErrors.email = 'Email is required';
      }

      if (!formData.password) {
         newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
         newErrors.password = 'Password must be at least 6 characters';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      if (!validateForm()) return;

      setIsLoading(true);

      /* eslint-disable-next-line no-unused-vars */
      const { data, error } = await supabase.auth.signInWithPassword({
         email: formData.email,
         password: formData.password,
      });

      if (error) return setError(error.message);

      // ✅ Store the session token safely (handled by Supabase internally)
      navigate("/admin/edit");
      setIsLoading(false);
   };

   return (
      <div className="login-container">
         <form onSubmit={handleSubmit} className="login-form">
            <h2>Welcome Back</h2>
            {error && <span className="error-message">{error}</span>}

            <div className="form-group">
               <label htmlFor="email">Email:</label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                  autoComplete="email"
               />
               {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
               <label htmlFor="password">Password:</label>
               <div className="password-input-container">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     className={errors.password ? 'error' : ''}
                     placeholder="Enter your password"
                     autoComplete="current-password"
                  />
                  <button
                     type="button"
                     className="show-password-btn"
                     onClick={() => setShowPassword(!showPassword)}
                     tabIndex={-1}
                  >
                     {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
               </div>
               {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button
               type="submit"
               className="login-button"
               disabled={isLoading}
            >
               {isLoading ? (
                  <>
                     <span className="spinner"></span>
                     Logging in...
                  </>
               ) : (
                  'Login'
               )}
            </button>
         </form>
      </div>
   );
}

export default LoginForm;