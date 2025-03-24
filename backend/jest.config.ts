import type {Config} from 'jest'

const jestConfig:Config = {
    preset:'ts-jest',
    testEnvironment: "node",
    verbose:true,
    collectCoverage:true,
    collectCoverageFrom:[
        'src/**/*.{ts,js}',
        '!src/main.ts',
        '!src/**/entities/*.entity.{ts}',
        '!src/**/*.module.ts',
    ],
    coverageDirectory:'coverage',


}

export default jestConfig