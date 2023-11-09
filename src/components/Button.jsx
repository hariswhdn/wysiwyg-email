function Button({type = "button", onClick, disabled, children}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
