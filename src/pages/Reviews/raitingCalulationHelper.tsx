import { IReview, TRating, ERaiting } from '../../types/types';

export interface IRaitingCalulationHelperResult {
  raitingScore: IRaitingAverage
}

export interface IRaitingAverage {
  texture: number;
  taste: number,
  presentation: number
}


export interface IraitingCalulationHelperParams {
  reviews: IReview[]
}

export function raitingCalulationHelper({ reviews }: IraitingCalulationHelperParams): IRaitingCalulationHelperResult {
  const textureAverage = reviews.reduce((result: TRating, currentValue) => {
    switch (currentValue.ratings.texture) {
      case 1:
        result[ERaiting.TERRIBLE] = result.terrible + 1;
        break;
      case 2:
        result[ERaiting.POOR] = result.poor + 1;
        break;
      case 3:
        result[ERaiting.AVERAGE] = result.average + 1;
        break;
      case 4:
        result[ERaiting.VERY_GOOD] = result['very good'] + 1;
        break
      default:
        result[ERaiting.EXCELLENT] = result.excellent + 1;
        break;
    }

    return result;
  }, {
    [ERaiting.TERRIBLE]: 0,
    [ERaiting.POOR]: 0,
    [ERaiting.AVERAGE]: 0,
    [ERaiting.VERY_GOOD]: 0,
    [ERaiting.EXCELLENT]: 0
  })

  const tasteAverage = reviews.reduce((result: TRating, currentValue) => {
    switch (currentValue.ratings.taste) {
      case 1:
        result[ERaiting.TERRIBLE] = result.terrible + 1;
        break;
      case 2:
        result[ERaiting.POOR] = result.poor + 1;
        break;
      case 3:
        result[ERaiting.AVERAGE] = result.average + 1;
        break;
      case 4:
        result[ERaiting.VERY_GOOD] = result['very good'] + 1;
        break
      default:
        result[ERaiting.EXCELLENT] = result.excellent + 1;
        break;
    }

    return result;
  }, {
    [ERaiting.TERRIBLE]: 0,
    [ERaiting.POOR]: 0,
    [ERaiting.AVERAGE]: 0,
    [ERaiting.VERY_GOOD]: 0,
    [ERaiting.EXCELLENT]: 0
  })

  const presentationAverage = reviews.reduce((result: TRating, currentValue) => {
    switch (currentValue.ratings.taste) {
      case 1:
        result[ERaiting.TERRIBLE] = result.terrible + 1;
        break;
      case 2:
        result[ERaiting.POOR] = result.poor + 1;
        break;
      case 3:
        result[ERaiting.AVERAGE] = result.average + 1;
        break;
      case 4:
        result[ERaiting.VERY_GOOD] = result['very good'] + 1;
        break
      default:
        result[ERaiting.EXCELLENT] = result.excellent + 1;
        break;
    }
    return result;
  }, {
    [ERaiting.TERRIBLE]: 0,
    [ERaiting.POOR]: 0,
    [ERaiting.AVERAGE]: 0,
    [ERaiting.VERY_GOOD]: 0,
    [ERaiting.EXCELLENT]: 0
  });


  const calculateScore = (average: TRating) => {

    const averageRating = (1 * average.terrible +
      2 * average.poor + 3 * average.average +
      4 * average['very good'] +
      5 * average.excellent) / (average.terrible
        + average.poor
        + average.average
        + average['very good']
        + average.excellent);

    return averageRating;
  }

  const raitingScore = {
    texture: Math.round(calculateScore(textureAverage)),
    taste: Math.round(calculateScore(tasteAverage)),
    presentation: Math.round(calculateScore(presentationAverage))
  }

  return {
    raitingScore
  }
}

