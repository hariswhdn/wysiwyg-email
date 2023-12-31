function Button({type = 'button', id, title, title_x, title_y, onClick, disabled, tabIndex, children}) {
  return (
    <button
      type={type}
      id={id}
      data-title={title}
      data-title-x={title_x}
      data-title-y={title_y}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
