import { motion } from "framer-motion";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/447774999123"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl flex items-center justify-center"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.366.632 4.681 1.832 6.713L2.667 29.333l6.806-1.784A13.267 13.267 0 0 0 16.003 29.333c7.364 0 13.33-5.969 13.33-13.333S23.367 2.667 16.003 2.667zm0 24.267a11 11 0 0 1-5.61-1.537l-.402-.24-4.038 1.059 1.078-3.933-.263-.404A10.99 10.99 0 0 1 5.003 16c0-6.069 4.931-11 11-11s11 4.931 11 11-4.931 11-11 11zm6.03-8.23c-.33-.165-1.953-.964-2.256-1.073-.303-.11-.523-.165-.743.165-.22.33-.852 1.073-1.045 1.293-.192.22-.385.248-.715.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.644-1.956-1.836-2.286-.193-.33-.021-.508.144-.673.149-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.79-1.018-2.45-.268-.644-.54-.557-.743-.567l-.633-.011a1.21 1.21 0 0 0-.88.413c-.303.33-1.155 1.128-1.155 2.753s1.183 3.193 1.348 3.413c.165.22 2.327 3.554 5.641 4.985.789.34 1.404.543 1.883.695.791.252 1.511.216 2.08.131.634-.094 1.953-.799 2.228-1.57.275-.771.275-1.432.192-1.57-.082-.138-.302-.22-.633-.385z"/>
      </svg>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
    </motion.a>
  );
}
