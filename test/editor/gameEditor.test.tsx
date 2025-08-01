/* @vitest-environment jsdom */
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest'
import { GameEditor } from '../../src/editor/components/GameEditor'
import { createRoot } from 'react-dom/client'
import { act } from 'react'

function flushPromises() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

afterEach(() => {
  vi.restoreAllMocks()
})

beforeAll(() => {
  ;(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true
})

describe('GameEditor', () => {
  it('adds language and page entries', async () => {
    const data = {
      title: '',
      description: '',
      version: '',
      'initial-data': { language: '', 'start-page': '' },
      languages: {},
      pages: {},
      maps: {},
      tiles: {},
      styling: [],
      handlers: [],
      'virtual-keys': [],
      'virtual-inputs': []
    }
    const fetchMock = vi.fn().mockResolvedValue({ json: vi.fn().mockResolvedValue(data) })
    ;(globalThis as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch

    const container = document.createElement('div')
    document.body.appendChild(container)
    await act(async () => {
      createRoot(container).render(<GameEditor />)
      await flushPromises()
    })

    const languagesSection = Array.from(container.querySelectorAll('h2'))
      .find((h) => h.textContent === 'Languages')!.parentElement as HTMLElement
    const pagesSection = Array.from(container.querySelectorAll('h2'))
      .find((h) => h.textContent === 'Pages')!.parentElement as HTMLElement
    expect(languagesSection.querySelectorAll('fieldset').length).toBe(0)
    expect(pagesSection.querySelectorAll('fieldset').length).toBe(0)

    const addLanguage = Array.from(languagesSection.querySelectorAll('button')).find((b) => b.textContent?.includes('Add Language'))!
    const addPage = Array.from(pagesSection.querySelectorAll('button')).find((b) => b.textContent?.includes('Add Page'))!

    await act(async () => {
      addLanguage.click()
      addPage.click()
      await flushPromises()
    })

    expect(languagesSection.querySelectorAll('fieldset').length).toBe(1)
    expect(pagesSection.querySelectorAll('fieldset').length).toBe(1)

    const languageInputs = languagesSection.querySelectorAll('fieldset input')
    const pageInputs = pagesSection.querySelectorAll('fieldset input')
    expect((languageInputs[0] as HTMLInputElement).value).toBe('')
    expect((languageInputs[1] as HTMLInputElement).value).toBe('')
    expect((pageInputs[0] as HTMLInputElement).value).toBe('')
    expect((pageInputs[1] as HTMLInputElement).value).toBe('')
  })

  it('removes entries when clicking remove', async () => {
    const data = {
      title: '',
      description: '',
      version: '',
      'initial-data': { language: '', 'start-page': '' },
      languages: { en: 'en.json' },
      pages: { start: 'start.json' },
      maps: {},
      tiles: {},
      styling: [],
      handlers: [],
      'virtual-keys': [],
      'virtual-inputs': []
    }
    const fetchMock = vi.fn().mockResolvedValue({ json: vi.fn().mockResolvedValue(data) })
    ;(globalThis as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch

    const container = document.createElement('div')
    document.body.appendChild(container)
    await act(async () => {
      createRoot(container).render(<GameEditor />)
      await flushPromises()
    })

    const languagesSection = Array.from(container.querySelectorAll('h2'))
      .find((h) => h.textContent === 'Languages')!.parentElement as HTMLElement
    const pagesSection = Array.from(container.querySelectorAll('h2'))
      .find((h) => h.textContent === 'Pages')!.parentElement as HTMLElement
    expect(languagesSection.querySelectorAll('fieldset').length).toBe(1)
    expect(pagesSection.querySelectorAll('fieldset').length).toBe(1)

    const removeLang = Array.from(languagesSection.querySelectorAll('button')).find((b) => b.textContent === 'Remove')!
    const removePage = Array.from(pagesSection.querySelectorAll('button')).find((b) => b.textContent === 'Remove')!

    await act(async () => {
      removeLang.click()
      removePage.click()
      await flushPromises()
    })

    expect(languagesSection.querySelectorAll('fieldset').length).toBe(0)
    expect(pagesSection.querySelectorAll('fieldset').length).toBe(0)
  })
})
