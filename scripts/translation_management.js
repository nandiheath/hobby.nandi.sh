import fs from 'fs';
import path from 'path';

/**
 * This script serves as a placeholder for a translation skill.
 * In a real-world scenario, this could call an AI API.
 * For now, it identifies missing keys in the English translation 
 * based on the Traditional Chinese translation and provides a structure.
 */

const ZH_PATH = path.join(process.cwd(), 'src/locales/zh_tw/translation.json');
const EN_PATH = path.join(process.cwd(), 'src/locales/en/translation.json');

function getDeepKeys(obj, prefix = '') {
  return Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
      return res;
    } else if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...getDeepKeys(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);
}

function getValueByPath(obj, path) {
  return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

function setValueByPath(obj, path, value) {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((o, i) => (o[i] = o[i] || {}), obj);
  target[last] = value;
}

async function runTranslation() {
  if (!fs.existsSync(ZH_PATH)) {
    console.error('Traditional Chinese translation file not found.');
    return;
  }

  const zh = JSON.parse(fs.readFileSync(ZH_PATH, 'utf-8'));
  const en = fs.existsSync(EN_PATH) ? JSON.parse(fs.readFileSync(EN_PATH, 'utf-8')) : {};

  const zhKeys = getDeepKeys(zh);
  const enKeys = getDeepKeys(en);

  const missingKeys = zhKeys.filter(key => !enKeys.includes(key));

  if (missingKeys.length === 0) {
    console.log('No missing keys found in English translation.');
  } else {
    console.log(`Found ${missingKeys.length} missing keys. Please translate them:`);
    missingKeys.forEach(key => {
      const zhValue = getValueByPath(zh, key);
      console.log(`- [${key}]: "${zhValue}"`);
      // In a real scenario, you could use an LLM here.
      // For this "skill", we'll just log them so the agent (me) can see them and act.
    });
  }

  // Example of how an agent would use this:
  // 1. Run this script to find missing keys.
  // 2. Agent reads the output and generates translations.
  // 3. Agent updates the EN_PATH file.
}

runTranslation();
