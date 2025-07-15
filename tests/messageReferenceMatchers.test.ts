import { describe, it, expect, assert } from "vitest";
import { parse } from "../src/ideExtension/messageReferenceMatchers";
import type { IPluginSettings } from "../src/settings";

// Test configuration
const testConfig: IPluginSettings = {
  recognizedTfuncNames: ['t', 'translate'],
  recognizedJSXAttributes: ['tx', 'i18nKey']
};

describe("messageReferenceMatchers", () => {
  it("should not match a function that ends with t but is not a t function", () => {
    const sourceCode = `
    const x = somet("some-id")
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(0);
  });

  it("should not match a string without a t function", () => {
    const sourceCode = `
    const x = some("some-id")
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(0);
  });

  it('should detect double quotes t("id")', () => {
    const sourceCode = `
    const x = t("some-id")
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.bundleId).toBe("some-id");
    expect(matches[0]?.position.start.character).toBe(18);
    expect(matches[0]?.position.end.character).toBe(26);
    expect(
      sourceCode.slice(
        matches[0]?.position.start.character,
        matches[0]?.position.end.character - 1
      )
    ).toBe('some-id');
  });

  it(`should detect single quotes t('id')`, () => {
    const sourceCode = `
    const x = t('some-id')
  `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.bundleId).toBe("some-id");
    expect(matches[0]?.position.start.character).toBe(18);
    expect(matches[0]?.position.end.character).toBe(26);
  });

  it(`should detect JSX <p>{t('id')}</p>`, () => {
    const sourceCode = `
    <p>{t('some-id')}</p>
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.bundleId).toBe("some-id");
    expect(matches[0]?.position.start.character).toBe(12);
    expect(matches[0]?.position.end.character).toBe(20);
  });

  it("should detect t('id', ...args)", () => {
    const sourceCode = `
    <p>{t('some-id' , { name: "inlang" }, variable, arg3)}</p>
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.bundleId).toBe("some-id");
    expect(
      sourceCode.slice(
        matches[0]?.position.start.character,
        matches[0]?.position.end.character - 1
      )
    ).toBe("some-id");
  });

  it("should not mismatch a string with different quotation marks", () => {
    const sourceCode = `
    <p>{t("yes')}</p>
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(0);
  });

  it("should handle whitespace correctly", () => {
    const sourceCode = `
      const x = t("some-id", undefined)
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.bundleId).toBe("some-id");
    expect(matches[0]?.position.start.character).toBe(20)
    expect(matches[0]?.position.end.character).toBe(28)
    expect(
      sourceCode.slice(
        matches[0]?.position.start.character,
        matches[0]?.position.end.character - 1
      )
    ).toBe('some-id');
  });

  it("should detect combined message.attribute ids", () => {
    const sourceCode = ` t('some-message.with-attribute')`;
    const matches = parse(sourceCode, testConfig);
    expect(matches[0]?.bundleId).toBe("some-message.with-attribute");
  });

  it(`should detect human readable id t("penguin_purple_shoe_window")`, () => {
    const sourceCode = `
  const x = t("penguin_purple_shoe_window")
  `;

    const matches = parse(sourceCode, testConfig);
    expect(matches[0]?.bundleId).toBe("penguin_purple_shoe_window");
    expect(matches[0]?.position.start.character).toBe(16);
    expect(matches[0]?.position.end.character).toBe(43);
  });

  it("should work on a production JSX example", () => {
    const sourceCode = `
    import NextPage from "next";
    import Image from "next/image";
    import { useTranslation } from "react-multi-lang";

    t("hello-world")

    const Custom404: NextPage = () => {
      const t = useTranslation();
      return (
        <div className="flex h-screen items-center justify-center">
          <Image
            src="/icons/warning.svg"
            alt={t("404.title")}
            height={25}
            width={25}
          />
          <h6>{t("421.message")}</h6>
        </div>
      );
    };

    export default Custom404;
    `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(3);
    expect(matches[0]?.bundleId).toBe("hello-world");
    expect(matches[1]?.bundleId).toBe("404.title");
    expect(matches[2]?.bundleId).toBe("421.message");
  });

  it("should detect JSX attributes", () => {
    const sourceCode = `
    <Text tx="welcome.message" />
    <Button i18nKey="button.submit">Submit</Button>
    <div tx={'dynamic.key'} />
  `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(3);
    expect(matches[0]?.bundleId).toBe("welcome.message");
    expect(matches[1]?.bundleId).toBe("button.submit");
    expect(matches[2]?.bundleId).toBe("dynamic.key");
  });

  it("should support configurable function names", () => {
    const sourceCode = `
    t("default.function")
    translate("custom.function")
    i18n("another.function")
    notConfigured("should.not.match")
  `;
    const customConfig: IPluginSettings = {
      recognizedTfuncNames: ['translate', 'i18n'],
      recognizedJSXAttributes: []
    };
    const matches = parse(sourceCode, customConfig);
    expect(matches).toHaveLength(2);
    expect(matches[0]?.bundleId).toBe("custom.function");
    expect(matches[1]?.bundleId).toBe("another.function");
  });

  it("should handle nested JSX with multiple translation calls", () => {
    const sourceCode = `
    <div>
      <h1>{t("page.title")}</h1>
      <Text tx="page.subtitle" />
      <p>{translate("page.description")}</p>
      <Button i18nKey="action.submit" onClick={() => alert(t("alert.confirm"))} />
    </div>
  `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(5);
    expect(matches.map(m => m.bundleId)).toEqual([
      "page.title",
      "page.subtitle", 
      "page.description",
      "action.submit",
      "alert.confirm"
    ]);
  });

  it("should handle template literals and complex expressions", () => {
    const sourceCode = `
    const message = t("simple.key");
    const complex = someFunc(t("nested.call"));
    const jsx = <Text tx={\`dynamic.\${type}\`} />;
    const conditional = condition ? t("true.case") : t("false.case");
  `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(4); // Should find simple.key, nested.call, true.case, false.case
    expect(matches.map(m => m.bundleId)).toContain("simple.key");
    expect(matches.map(m => m.bundleId)).toContain("nested.call");
    expect(matches.map(m => m.bundleId)).toContain("true.case");
  });

  it("should handle edge cases with quotes and escaping", () => {
    const sourceCode = `
    t("message.with.dots")
    t('single.quotes')
    t("message-with-dashes")
    t("message_with_underscores")
    t("message:with:colons")
  `;
    const matches = parse(sourceCode, testConfig);
    expect(matches).toHaveLength(5);
    expect(matches.map(m => m.bundleId)).toEqual([
      "message.with.dots",
      "single.quotes",
      "message-with-dashes", 
      "message_with_underscores",
      "message:with:colons"
    ]);
  });
});