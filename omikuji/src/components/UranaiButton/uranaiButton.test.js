import { shallowMount } from '@vue/test-utils'
import uranaiButton from "./index.vue"

describe('uranaiButton', () => {
  const props = {
      text: 'リモートワークさせろ',
  }

  it('ボタンテキストが正しく表示されているか確認', () => {
    // propsを受け取り shallowMountし テスト対象component生成
    const wrapper = shallowMount(uranaiButton, { propsData: { ...props } })

    // {{ txt }}にpropsで受け取った値が表示されているか確認
    expect(wrapper.text()).toBe(props.text)
  })


  it('clickイベントの確認', () => {
    // propsを受け取り shallowMountし テスト対象component生成
    const wrapper = shallowMount(uranaiButton, { propsData: { ...props } })

    expect(wrapper.emitted('result')).toBeUndefined()

    // clickイベント実行
    wrapper.trigger('click')

    // myActionが実行されたか確認
    expect(wrapper.emitted('result')).toBeTruthy()
  })
})