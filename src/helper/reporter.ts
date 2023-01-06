// /* eslint-disable */
// import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'
// import SuiteInfo = jasmine.SuiteInfo

// class CustomProcessor extends DisplayProcessor {
//   public displayJasmineStarted(info: SuiteInfo, log: string): string {
//     return `${log}`
//   }
// }

// jasmine.getEnv().clearReporters()
// jasmine.getEnv().addReporter(
//   new SpecReporter({
//     suite: {
//       displayNumber: true
//     },
//     spec: {
//       displayStacktrace: StacktraceOption.NONE
//     },
//     customProcessors: [CustomProcessor]
//   })
// )

import Jasmine from "jasmine"
import { SpecReporter, StacktraceOption } from "jasmine-spec-reporter"

const jasmine = new Jasmine({})
jasmine.env.clearReporters()
jasmine.env.addReporter(new SpecReporter({
    spec: { displayStacktrace: StacktraceOption.RAW }
  }) as unknown as jasmine.CustomReporter)