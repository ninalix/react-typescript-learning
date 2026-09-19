type ButtonProps = {
  label: string
  variant: 'primary' | 'secondary' | 'danger'
}

function Button({label, variant}: ButtonProps) {
  return (
    <button className={variant}>
      {label}
    </button>
  )
}

export default Button