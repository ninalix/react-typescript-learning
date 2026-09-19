import type { ReactNode } from "react" // type-only import 

type CardProps = {
  children: ReactNode
}

function Card({children}: CardProps) {
  return <div className="card">{children}</div>;
}

export default Card