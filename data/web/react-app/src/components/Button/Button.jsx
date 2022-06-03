import "./Button.css";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Button({ href, children, className, ...rest }) {
  if (href) {
    return (
      <Link className={clsx("button", className)} to={href} {...rest}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={clsx("button", className)} {...rest}>
        {children}
      </button>
    );
  }
}
