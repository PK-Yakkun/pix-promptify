import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import type { RenderResult } from '@testing-library/react'
import type { ImageProps } from 'next/image'
import Home from './page'

// next/imageのモックをより厳密に定義
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ alt, ...props }: ImageProps) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  }
}))

describe('Home', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(<Home />)
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('メインコンテンツが正しく表示される', () => {
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument()
    expect(screen.getByText('Deploy now')).toBeInTheDocument()
    expect(screen.getByText('Read our docs')).toBeInTheDocument()
  })

  it('フッターのリンクが正しく表示される', () => {
    expect(screen.getByText('Learn')).toBeInTheDocument()
    expect(screen.getByText('Examples')).toBeInTheDocument()
    expect(screen.getByText(/Go to nextjs.org/i)).toBeInTheDocument()
  })
})