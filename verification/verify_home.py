from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        # Navigate
        page.goto("http://localhost:8000/index.html")

        # 1. Verify Hero
        # Wait for hero title
        page.wait_for_selector(".hero-title")
        # Take screenshot of Hero
        page.screenshot(path="verification/hero_fixed.png")
        print("Hero screenshot taken.")

        # 2. Verify Sobre Mi
        # Scroll to sobre mi
        sobremi = page.locator("#sobremi")
        sobremi.scroll_into_view_if_needed()

        # Wait a bit for AOS animations
        page.wait_for_timeout(2000)

        # Take screenshot of Sobre Mi
        page.screenshot(path="verification/sobremi_fixed.png")
        print("Sobre Mi screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
