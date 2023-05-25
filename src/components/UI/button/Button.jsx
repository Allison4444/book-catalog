import classes from './Button.module.css'

function Button({children, ...props}) {
  const rootClasses = [classes.button];

  if (props.disabled) {
    rootClasses.push(classes.disabled)
  }

  return (
    <button {...props} className={rootClasses.join(' ')} disabled={props.disabled ? true : false}>
      {children}
    </button>
  )
}

export default Button;