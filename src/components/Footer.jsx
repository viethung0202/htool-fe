export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} htool. All rights reserved.
      </div>
    </footer>
  )
}
