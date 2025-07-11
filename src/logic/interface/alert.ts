export interface AlertProps {
  variant: "success" | "error" | "warning" | "info"; // Alert type
  title: string; // Title of the alert
  message: string; // Message of the alert
  showLink?: boolean; // Whether to show the "Learn More" link
  linkHref?: string; // Link URL
  linkText?: string; // Link text
}