import classes from './ErrorSpan.module.css'

function ErrorSpan({ children, error }) {
  const rootClasses = [ classes.error ];

  if (error) {
    rootClasses.push(classes.visible)
  }

  return (
    <span className={rootClasses.join(' ')}>{children}</span>
  )
}

export default ErrorSpan;
