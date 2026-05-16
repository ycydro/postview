import React from "react"

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full border-t border-primary/25 bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-6">
        <p className="text-sm text-muted-foreground">© {year} Postview.</p>
      </div>
    </footer>
  )
}

export default Footer
