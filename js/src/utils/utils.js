const UtilsFunctions = {
  debounce(func, wait=300){
    let timeout
    return function(event){
      clearTimeout(timeout)
      timeout = setTimeout(()=>{
        func.call(this, event)
      },wait)
    }
  }
}
export default UtilsFunctions;
