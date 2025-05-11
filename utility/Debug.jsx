import useGlobalStore from './useGlobalStore'

export default function Debug() {
    const { isMobile } = useGlobalStore()

    return (
        <div style={{
            position: 'fixed',
            top: 10,
            left: 10,
            padding: '8px',
            background: '#000',
            color: '#fff',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 9999,
            borderRadius: '4px',
        }}>
            Device: {isMobile ? '📱 Mobile' : '💻 Desktop'} |
            iOS: {/iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Yes' : 'No'}
        </div>
    )
}
