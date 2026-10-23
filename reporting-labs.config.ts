import type { ReportingLabsOptions } from 'reporting-labs'

const reportingLabs: ReportingLabsOptions = {
  title: 'AI RnD Automation Suite',
  outputFolder: 'reporting-labs',
  emitJson: true,
  history: {
    enabled: true,
    file: '.reporting-labs/history.json',
    keep: 30,
  },
  pdf: false,
  warnMissingMeta: false,
}

export default reportingLabs
