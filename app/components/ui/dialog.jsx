.dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  width: 500px;
  border-radius: 0.5rem;
  padding: 1.5rem;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
}

@media (max-width: 640px) {
  .dialog-content {
    width: 95vw;
    max-height: 80vh;
    padding: 1rem;
  }
}

.dialog-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 40;
} 