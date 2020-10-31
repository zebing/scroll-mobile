import { mount } from '@vue/test-utils'
import ScrollMobile from '../src'

test('renders correctly', () => {
  const wrapper = mount(ScrollMobile)
  expect(wrapper.element).toMatchSnapshot()
})