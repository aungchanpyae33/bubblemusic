import type React from "react";
import Link, { type LinkProps } from "next/link";
import { type AnchorHTMLAttributes, forwardRef } from "react";

// Combine LinkProps with anchor attributes, excluding conflicting props
type NoThankYouPreFetchLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  };

const NoThankYouPreFetchLink = forwardRef<
  HTMLAnchorElement,
  NoThankYouPreFetchLinkProps
>(({ ...props }, ref) => {
  return <Link ref={ref} prefetch={props.prefetch} {...props} />;
});

NoThankYouPreFetchLink.displayName = "NoThankYouPreFetchLink";

export default NoThankYouPreFetchLink;
