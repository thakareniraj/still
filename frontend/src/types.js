// Type definitions converted to JSDoc comments

/**
 * @typedef {'breathing' | 'eyes' | 'mindwarmup' | 'declutter'} SessionType
 */

/**
 * @typedef {Object} BreathingPattern
 * @property {string} name
 * @property {number} inhale
 * @property {number} hold
 * @property {number} exhale
 * @property {number} cycles
 */

/**
 * @typedef {Object} EyeExerciseConfig
 * @property {number} lookAwayInterval
 * @property {number} peripheralVisionDuration
 */

/**
 * @typedef {Object} MindWarmUpContent
 * @property {string} paragraph
 * @property {string[]} questions
 * @property {'easy' | 'medium' | 'hard'} difficulty
 */

/**
 * @typedef {Object} DeclutterSession
 * @property {string} thoughtsDump
 * @property {string} intention
 * @property {number} timestamp
 */

/**
 * @typedef {Object} SoundConfig
 * @property {string} name
 * @property {number} duration
 * @property {number} fadeIn
 * @property {number} fadeOut
 */

export {};
