export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card/50 border-t border-border/50 py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Abuja Stays. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Your perfect getaway in the heart of Nigeria.
        </p>
      </div>
    </footer>
  );
}
