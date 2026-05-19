package realtime

import "sync"

type Hub struct {
	mu      sync.RWMutex
	clients map[chan string]struct{}
}

func NewHub() *Hub {
	return &Hub{clients: make(map[chan string]struct{})}
}

func (h *Hub) Subscribe() chan string {
	ch := make(chan string, 8)
	h.mu.Lock()
	h.clients[ch] = struct{}{}
	h.mu.Unlock()
	return ch
}

func (h *Hub) Unsubscribe(ch chan string) {
	h.mu.Lock()
	if _, ok := h.clients[ch]; ok {
		delete(h.clients, ch)
		close(ch)
	}
	h.mu.Unlock()
}

func (h *Hub) Broadcast(message string) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	for ch := range h.clients {
		select {
		case ch <- message:
		default:
		}
	}
}
