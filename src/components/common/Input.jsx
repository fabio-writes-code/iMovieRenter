const Input = ({name, label, error,...rest}) => {
  return ( 
  <div className="form-group">
    <label htmlFor="username">{label}</label>
    <input
      {...rest}
      // value={value}
      // onChange={onChange}
      // autoFocus={autoFocus}
      // type={type}
      // ref={username}
      name={name}
      id={name}
      className="form-control"
    />
    {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
 
export default Input;