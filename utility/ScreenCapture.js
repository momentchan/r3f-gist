export default class ScreenCapture {
    Snap(name = 'Screenshot.png') {
        const link = document.createElement('a')
        link.setAttribute('download', name)
        link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
        link.click()
    }
}