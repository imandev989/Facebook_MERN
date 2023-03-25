// import './style.css';
// const LoginInput = ({placeholder, type, name})=> {
//   return (
//     <div className='input_wrap'>
//       <input type={type} name={name} placeholder={placeholder} />
//     </div>
//   )
// }

// export default LoginInput

import "./style.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

const LoginInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 650px)",
  });
  // console.log(desktopView);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className={desktopView ? "input_error input_error_desktop" : "input_error"} style={{ transform: "translateY(3px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className={desktopView ? "error_arrow_left" : "error_arrow_top"}></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div className={desktopView ? "input_error input_error_desktop" : "input_error"} style={{ transform: "translateY(2px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className={desktopView ? "error_arrow_left" : "error_arrow_bottom"}></div>
            )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i className="error_icon" style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}></i>
      )}
    </div>
  );
};

export default LoginInput;
