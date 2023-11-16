function Button({type = 'button', title, title_x, title_y, onClick, disabled, children}) {
  return (
    <button
      type={type}
      data-title={title}
      data-title-x={title_x}
      data-title-y={title_y}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
