import { StorageKeys } from '../types/AsyncStorage';
import { getItem, removeItem, setItem } from './asyncStorage';

export type DepositStep =
  | 'submit_started'
  | 'api_request_sent'
  | 'api_response_received'
  | 'transactions_applied'
  | 'form_reset'
  | 'loading_dismissed'
  | 'navigating_home'
  | 'submit_complete'
  | 'submit_failed';

export interface DepositFlowEntry {
  step: DepositStep;
  at: string;
  skippedReport?: boolean;
  transactionCount?: number;
  error?: string;
  details?: Record<string, unknown>;
}

const LOG_PREFIX = '[DepositFlow]';

export const depositLogger = {
  async step(
    step: DepositStep,
    meta: Omit<DepositFlowEntry, 'step' | 'at'> = {},
  ): Promise<void> {
    const entry: DepositFlowEntry = {
      step,
      at: new Date().toISOString(),
      ...meta,
    };
    console.log(LOG_PREFIX, step, meta.details ?? meta.error ?? '');
    try {
      await setItem(StorageKeys.lastDepositFlow, JSON.stringify(entry));
    } catch (e) {
      console.warn(LOG_PREFIX, 'Failed to persist deposit flow step', e);
    }
  },

  async clear(): Promise<void> {
    await removeItem(StorageKeys.lastDepositFlow);
  },

  async getLastFlow(): Promise<DepositFlowEntry | null> {
    const raw = await getItem(StorageKeys.lastDepositFlow);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as DepositFlowEntry;
    } catch {
      return null;
    }
  },

  async warnIfPreviousFlowIncomplete(): Promise<void> {
    const last = await this.getLastFlow();
    if (!last || last.step === 'submit_complete') {
      return;
    }
    console.warn(
      `${LOG_PREFIX} Previous deposit did not finish cleanly. Last step: ${last.step} at ${last.at}`,
      last,
    );
  },
};
