import { mount } from '@vue/test-utils'
import SpieleComponent from '@/views/SpieleComponent.vue'

describe('SpieleComponent.vue', () => {
  it('renders folder view', () => {
    const mockRoute = {
      params: {
        id: 'Outbox'
      }
    }
    const wrapper = mount(SpieleComponent, {
      global: {
        mocks: {
          $route: mockRoute
        }
      }
    })
    expect(wrapper.text()).toMatch('Explore UI Components')
  })
})
