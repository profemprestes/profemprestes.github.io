from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify Index
        print("Visiting Index...")
        page.goto("http://localhost:8080/index.html")
        page.screenshot(path="verification/index_screenshot.png")

        # Verify Materias
        print("Visiting Materias...")
        page.goto("http://localhost:8080/materias.html")
        page.screenshot(path="verification/materias_screenshot.png")

        # Check for Nav Toggle in Mobile View
        print("Checking Mobile Nav...")
        page.set_viewport_size({"width": 375, "height": 667})
        page.reload()
        # Click toggle
        page.click("#nav-toggle")
        page.wait_for_timeout(500) # Wait for animation
        page.screenshot(path="verification/mobile_nav_screenshot.png")

        browser.close()

if __name__ == "__main__":
    run()
