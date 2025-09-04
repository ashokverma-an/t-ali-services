class EventBus {
  private events: { [key: string]: Function[] } = {}

  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  emit(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
    
    localStorage.setItem('lastEvent', JSON.stringify({ event, data, timestamp: Date.now() }))
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'lastEvent',
      newValue: JSON.stringify({ event, data, timestamp: Date.now() })
    }))
  }

  off(event: string, callback: Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }
}

export const eventBus = new EventBus()

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'lastEvent' && e.newValue) {
      const { event, data } = JSON.parse(e.newValue)
      eventBus.emit(event, data)
    }
  })
}