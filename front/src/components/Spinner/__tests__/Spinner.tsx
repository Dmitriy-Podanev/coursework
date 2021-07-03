import { Spinner } from '../Spinner'
import renderer from 'react-test-renderer'

describe('Spinner component', () => {
  it('should be defined', () => {
    expect(Spinner).toBeDefined()
  })

  it('should be render', () => {
    const component = renderer.create(<Spinner/>).toJSON()
    expect(component).toMatchSnapshot()
  })

  it('should be set size', () => {
    const component = renderer.create(<Spinner size={50}/>).toJSON()
    expect(component).toMatchSnapshot()
  })
})
