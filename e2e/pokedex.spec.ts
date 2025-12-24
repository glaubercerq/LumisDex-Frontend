import { test, expect } from '@playwright/test'

test.describe('Pokédex', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the header with title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /lumisdex/i })).toBeVisible()
  })

  test('should display pokemon cards after loading', async ({ page }) => {
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    const cards = await page.locator('.pokemon-card').count()
    expect(cards).toBeGreaterThan(0)
  })

  test('should search for a pokemon by name', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Buscar Pokémon por nome...')
    await searchInput.fill('pikachu')
    
    await page.waitForTimeout(600)
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    await expect(page.getByText('Pikachu')).toBeVisible()
  })

  test('should filter pokemon by type', async ({ page }) => {
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    await page.click('button:has-text("Fogo")')
    
    await page.waitForTimeout(500)
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    const cards = await page.locator('.pokemon-card').count()
    expect(cards).toBeGreaterThan(0)
  })

  test('should navigate between pages', async ({ page }) => {
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    const nextButton = page.getByLabel('Próxima página')
    await nextButton.click()
    
    await page.waitForTimeout(500)
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    const currentPage = page.locator('.pagination__button--active')
    await expect(currentPage).toHaveText('2')
  })

  test('should open modal when clicking on a pokemon', async ({ page }) => {
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    await page.locator('.pokemon-card').first().click()
    
    await expect(page.locator('.pokemon-modal')).toBeVisible()
  })

  test('should close modal when clicking close button', async ({ page }) => {
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    await page.locator('.pokemon-card').first().click()
    await expect(page.locator('.pokemon-modal')).toBeVisible()
    
    await page.click('.pokemon-modal__close')
    
    await expect(page.locator('.pokemon-modal')).not.toBeVisible()
  })

  test('should close modal when pressing Escape', async ({ page }) => {
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    await page.locator('.pokemon-card').first().click()
    await expect(page.locator('.pokemon-modal')).toBeVisible()
    
    await page.keyboard.press('Escape')
    
    await expect(page.locator('.pokemon-modal')).not.toBeVisible()
  })

  test('should show empty state when no pokemon found', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Buscar Pokémon por nome...')
    await searchInput.fill('xyznonexistent')
    
    await page.waitForTimeout(600)
    
    await expect(page.getByText('Nenhum Pokémon encontrado')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.waitForSelector('.pokemon-card', { timeout: 10000 })
    
    const cards = await page.locator('.pokemon-card').count()
    expect(cards).toBeGreaterThan(0)
    
    await expect(page.getByRole('heading', { name: /lumisdex/i })).toBeVisible()
  })
})

