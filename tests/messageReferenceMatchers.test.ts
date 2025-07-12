import { describe, it, expect } from "vitest";
import { parse } from "./messageReferenceMatchers.js";

// Test configuration
const testConfig = {
	functionNames: ['t', 'translate'],
	jsxAttributes: ['tx', 'i18nKey']
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
		expect(matches[0]?.messageId).toBe("some-id");
		expect(matches[0]?.position.start.character).toBe(18);
		expect(matches[0]?.position.end.character).toBe(25);
		expect(
			sourceCode.slice(
				matches[0]?.position.start.character,
				matches[0]?.position.end.character
			)
		).toBe('some-id');
	});

	it(`should detect single quotes t('id')`, () => {
		const sourceCode = `
    const x = t('some-id')
  `;
		const matches = parse(sourceCode, testConfig);
		expect(matches[0]?.messageId).toBe("some-id");
		expect(matches[0]?.position.start.character).toBe(18);
		expect(matches[0]?.position.end.character).toBe(25);
	});

	it(`should detect JSX <p>{t('id')}</p>`, () => {
		const sourceCode = `
    <p>{t('some-id')}</p>
    `;
		const matches = parse(sourceCode, testConfig);
		expect(matches[0]?.messageId).toBe("some-id");
		expect(matches[0]?.position.start.character).toBe(12);
		expect(matches[0]?.position.end.character).toBe(19);
	});

	it("should detect t('id', ...args)", () => {
		const sourceCode = `
    <p>{t('some-id' , { name: "inlang" }, variable, arg3)}</p>
    `;
		const matches = parse(sourceCode, testConfig);
		expect(matches[0]?.messageId).toBe("some-id");
		expect(
			sourceCode.slice(
				matches[0]?.position.start.character,
				matches[0]?.position.end.character
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
		const sourceCode = `const x = t("some-id", undefined)`;
		const matches = parse(sourceCode, testConfig);
		expect(matches[0]?.messageId).toBe("some-id");
		expect(
			sourceCode.slice(
				matches[0]?.position.start.character,
				matches[0]?.position.end.character
			)
		).toBe('some-id');
	});

	it("should detect combined message.attribute ids", () => {
		const sourceCode = ` t('some-message.with-attribute')`;
		const matches = parse(sourceCode, testConfig);
		expect(matches[0]?.messageId).toBe("some-message.with-attribute");
	});

	it(`should detect human readable id t("penguin_purple_shoe_window")`, () => {
		const sourceCode = `
	const x = t("penguin_purple_shoe_window")
	`;

		const matches = parse(sourceCode, testConfig);
		expect(matches[0]?.messageId).toBe("penguin_purple_shoe_window");
		expect(matches[0]?.position.start.character).toBe(15);
		expect(matches[0]?.position.end.character).toBe(41);
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
		expect(matches[0]?.messageId).toBe("hello-world");
		expect(matches[1]?.messageId).toBe("404.title");
		expect(matches[2]?.messageId).toBe("421.message");
	});

	it("should detect JSX attributes", () => {
		const sourceCode = `
		<Text tx="welcome.message" />
		<Button i18nKey="button.submit">Submit</Button>
		<div tx={'dynamic.key'} />
	`;
		const matches = parse(sourceCode, testConfig);
		expect(matches).toHaveLength(3);
		expect(matches[0]?.messageId).toBe("welcome.message");
		expect(matches[1]?.messageId).toBe("button.submit");
		expect(matches[2]?.messageId).toBe("dynamic.key");
	});

	it("should handle malformed code gracefully", () => {
		const sourceCode = `
		const incomplete = t("valid.message"
		<Text tx="another.message" 
		function broken() {
			return t("still.works");
		}
	`;
		const matches = parse(sourceCode, testConfig);
		// Should still find at least the valid messages
		expect(matches.length).toBeGreaterThan(0);
		const messageIds = matches.map(m => m.messageId);
		expect(messageIds).toContain("valid.message");
		expect(messageIds).toContain("another.message");
		expect(messageIds).toContain("still.works");
	});

	it("should support configurable function names", () => {
		const sourceCode = `
		t("default.function")
		translate("custom.function")
		i18n("another.function")
		notConfigured("should.not.match")
	`;
		const customConfig = {
			functionNames: ['translate', 'i18n'],
			jsxAttributes: []
		};
		const matches = parse(sourceCode, customConfig);
		expect(matches).toHaveLength(2);
		expect(matches[0]?.messageId).toBe("custom.function");
		expect(matches[1]?.messageId).toBe("another.function");
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
		expect(matches.map(m => m.messageId)).toEqual([
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
		expect(matches.map(m => m.messageId)).toContain("simple.key");
		expect(matches.map(m => m.messageId)).toContain("nested.call");
		expect(matches.map(m => m.messageId)).toContain("true.case");
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
		expect(matches.map(m => m.messageId)).toEqual([
			"message.with.dots",
			"single.quotes",
			"message-with-dashes", 
			"message_with_underscores",
			"message:with:colons"
		]);
	});
});