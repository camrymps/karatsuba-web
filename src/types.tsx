
export type KaratsubaFormProps = {
    onProductCalculation: (result: any) => void
  }

  export type KaratsubaProductStepsProps = {
      steps: KaratsubaStep[],
      currentStep: number
  }

  export type KaratsubaStep = {
    name: string,
    status: string,
    href: string,
    substeps: KaratsubaSubsteps[]
  }

  type KaratsubaSubsteps = {
      instruction: string,
      product?: number
  }