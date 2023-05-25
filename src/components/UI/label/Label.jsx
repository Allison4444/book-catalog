import classes from './Label.module.css'

const Label = ({children, labelFor}) => {
  return (
    <label className={classes.label} htmlFor={labelFor} >
      {children}
    </label>
  )
}

export default Label;