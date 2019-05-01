/* easySwiper.js */
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
  const idSlideClone = document.createElement(domName) // 应该有个直接Clone的属性的，我忘记了...
  idSlideClone.setAttribute('id', idSlideCloneID)
  idSlideClone.innerHTML = idSlide.innerHTML
  parentSlide.append(idSlideClone)
  function Marquee () {
    if (idSlideClone.offsetTop - parentSlide.scrollTop <= 0) {
      parentSlide.scrollTop -= idSlide.offsetHeight
    } else {
      parentSlide.scrollTop = parentSlide.scrollTop + 1
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
