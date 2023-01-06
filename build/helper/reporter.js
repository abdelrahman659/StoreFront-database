"use strict";
// /* eslint-disable */
// import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'
// import SuiteInfo = jasmine.SuiteInfo
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var jasmine_1 = __importDefault(require("jasmine"));
var jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
var jasmine = new jasmine_1.default({});
jasmine.env.clearReporters();
jasmine.env.addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: { displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.RAW }
}));
