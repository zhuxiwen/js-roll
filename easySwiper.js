/* easySwiper.js */
/* 上下滚动无缝轮播 */
const SPEED = 40
export const EasySwiper = ({
  speed = SPEED, // 速度
  parentId, // 父ID
  id, // 子ID
  domName = 'div', // DOM类型
  onMoveCanStop = false, // 移入停止
  cloneDomId // 克隆出的DOM的ID名 非数字
}) => {
  const idSlideCloneID = !cloneDomId || !isNaN(cloneDomId) ? `${id.toString()}-clone-easy-swiper` : cloneDomId
  const parentSlide = document.getElementById(parentId)
  const idSlide = document.getElementById(id)
  if (idSlide.offsetHeight <= parentSlide.offsetHeight) return null // 这里父容器的高必须大于子的高
  const idSlideClone = document.createElement(domName) // 应该有个直接Clone的属性的，我忘记了...
  idSlideClone.setAttribute('id', idSlideCloneID)
  idSlideClone.innerHTML = idSlide.innerHTML
  parentSlide.append(idSlideClone)
  let prevValue = 0
  function Marquee () {
    if (idSlideClone.offsetTop - parentSlide.scrollTop <= 0) {
      parentSlide.scrollTop -= idSlide.offsetHeight
    } else {
      parentSlide.scrollTop += 1
      if (prevValue === parentSlide.scrollTop) {
        parentSlide.scrollTop -= idSlide.offsetHeight
      } else {
        prevValue = parentSlide.scrollTop
      }
    }
  }
  let MyMar = setInterval(Marquee, speed)
  if (onMoveCanStop) {
    parentSlide.onmouseover = () => { clearInterval(MyMar) }
    parentSlide.onmouseout = () => { MyMar = setInterval(Marquee, speed) }
  }
  return MyMar
}


// *.vue
this.MyMarTimer = EasySwiper({
  id: 'easyList',
  parentId: 'sideBox',
  domName: 'ul',
  onMoveCanStop: false
})
