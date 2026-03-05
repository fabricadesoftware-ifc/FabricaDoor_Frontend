/**
 * Composable para feedback háptico via Vibration API.
 * Funciona em dispositivos móveis com suporte a navigator.vibrate().
 * Degrada silenciosamente em navegadores sem suporte (desktop, iOS Safari).
 */
export function useHaptic() {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  /**
   * Vibração genérica.
   * @param {number|number[]} pattern - Duração em ms ou padrão [vibrar, pausa, vibrar, ...]
   */
  const vibrate = (pattern) => {
    if (isSupported) {
      navigator.vibrate(pattern)
    }
  }

  /** Toque leve — confirmação de botão (20ms) */
  const tapLight = () => vibrate(20)

  /** Toque médio — ação importante (40ms) */
  const tapMedium = () => vibrate(40)

  /** Toque forte — ação crítica como abrir porta (80ms) */
  const tapHeavy = () => vibrate(80)

  /** Sucesso — dois pulsos rápidos */
  const success = () => vibrate([30, 60, 50])

  /** Erro — três pulsos curtos */
  const error = () => vibrate([50, 30, 50, 30, 50])

  /** Warning — pulso longo */
  const warning = () => vibrate([100, 50, 30])

  /** Padrão de "porta abrindo" — sequência expressiva */
  const doorOpen = () => vibrate([15, 40, 80, 60, 30])

  /** Cancelar qualquer vibração em andamento */
  const cancel = () => vibrate(0)

  return {
    isSupported,
    vibrate,
    tapLight,
    tapMedium,
    tapHeavy,
    success,
    error,
    warning,
    doorOpen,
    cancel,
  }
}
