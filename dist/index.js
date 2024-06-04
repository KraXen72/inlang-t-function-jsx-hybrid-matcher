var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/@sinclair+typebox@0.31.28/node_modules/@sinclair/typebox/typebox.js
var require_typebox = __commonJS({
  "node_modules/.pnpm/@sinclair+typebox@0.31.28/node_modules/@sinclair/typebox/typebox.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Type = exports.JsonType = exports.JavaScriptTypeBuilder = exports.JsonTypeBuilder = exports.TypeBuilder = exports.TypeBuilderError = exports.TransformEncodeBuilder = exports.TransformDecodeBuilder = exports.TemplateLiteralDslParser = exports.TemplateLiteralGenerator = exports.TemplateLiteralGeneratorError = exports.TemplateLiteralFinite = exports.TemplateLiteralFiniteError = exports.TemplateLiteralParser = exports.TemplateLiteralParserError = exports.TemplateLiteralResolver = exports.TemplateLiteralPattern = exports.TemplateLiteralPatternError = exports.UnionResolver = exports.KeyArrayResolver = exports.KeyArrayResolverError = exports.KeyResolver = exports.ObjectMap = exports.Intrinsic = exports.IndexedAccessor = exports.TypeClone = exports.TypeExtends = exports.TypeExtendsResult = exports.TypeExtendsError = exports.ExtendsUndefined = exports.TypeGuard = exports.TypeGuardUnknownTypeError = exports.ValueGuard = exports.FormatRegistry = exports.TypeBoxError = exports.TypeRegistry = exports.PatternStringExact = exports.PatternNumberExact = exports.PatternBooleanExact = exports.PatternString = exports.PatternNumber = exports.PatternBoolean = exports.Kind = exports.Hint = exports.Optional = exports.Readonly = exports.Transform = void 0;
    exports.Transform = Symbol.for("TypeBox.Transform");
    exports.Readonly = Symbol.for("TypeBox.Readonly");
    exports.Optional = Symbol.for("TypeBox.Optional");
    exports.Hint = Symbol.for("TypeBox.Hint");
    exports.Kind = Symbol.for("TypeBox.Kind");
    exports.PatternBoolean = "(true|false)";
    exports.PatternNumber = "(0|[1-9][0-9]*)";
    exports.PatternString = "(.*)";
    exports.PatternBooleanExact = `^${exports.PatternBoolean}$`;
    exports.PatternNumberExact = `^${exports.PatternNumber}$`;
    exports.PatternStringExact = `^${exports.PatternString}$`;
    var TypeRegistry;
    (function(TypeRegistry2) {
      const map = /* @__PURE__ */ new Map();
      function Entries() {
        return new Map(map);
      }
      TypeRegistry2.Entries = Entries;
      function Clear() {
        return map.clear();
      }
      TypeRegistry2.Clear = Clear;
      function Delete(kind) {
        return map.delete(kind);
      }
      TypeRegistry2.Delete = Delete;
      function Has(kind) {
        return map.has(kind);
      }
      TypeRegistry2.Has = Has;
      function Set2(kind, func) {
        map.set(kind, func);
      }
      TypeRegistry2.Set = Set2;
      function Get(kind) {
        return map.get(kind);
      }
      TypeRegistry2.Get = Get;
    })(TypeRegistry || (exports.TypeRegistry = TypeRegistry = {}));
    var TypeBoxError = class extends Error {
      constructor(message) {
        super(message);
      }
    };
    exports.TypeBoxError = TypeBoxError;
    var FormatRegistry;
    (function(FormatRegistry2) {
      const map = /* @__PURE__ */ new Map();
      function Entries() {
        return new Map(map);
      }
      FormatRegistry2.Entries = Entries;
      function Clear() {
        return map.clear();
      }
      FormatRegistry2.Clear = Clear;
      function Delete(format) {
        return map.delete(format);
      }
      FormatRegistry2.Delete = Delete;
      function Has(format) {
        return map.has(format);
      }
      FormatRegistry2.Has = Has;
      function Set2(format, func) {
        map.set(format, func);
      }
      FormatRegistry2.Set = Set2;
      function Get(format) {
        return map.get(format);
      }
      FormatRegistry2.Get = Get;
    })(FormatRegistry || (exports.FormatRegistry = FormatRegistry = {}));
    var ValueGuard;
    (function(ValueGuard2) {
      function IsArray(value) {
        return Array.isArray(value);
      }
      ValueGuard2.IsArray = IsArray;
      function IsBigInt(value) {
        return typeof value === "bigint";
      }
      ValueGuard2.IsBigInt = IsBigInt;
      function IsBoolean(value) {
        return typeof value === "boolean";
      }
      ValueGuard2.IsBoolean = IsBoolean;
      function IsDate(value) {
        return value instanceof globalThis.Date;
      }
      ValueGuard2.IsDate = IsDate;
      function IsNull(value) {
        return value === null;
      }
      ValueGuard2.IsNull = IsNull;
      function IsNumber(value) {
        return typeof value === "number";
      }
      ValueGuard2.IsNumber = IsNumber;
      function IsObject(value) {
        return typeof value === "object" && value !== null;
      }
      ValueGuard2.IsObject = IsObject;
      function IsString(value) {
        return typeof value === "string";
      }
      ValueGuard2.IsString = IsString;
      function IsUint8Array(value) {
        return value instanceof globalThis.Uint8Array;
      }
      ValueGuard2.IsUint8Array = IsUint8Array;
      function IsUndefined(value) {
        return value === void 0;
      }
      ValueGuard2.IsUndefined = IsUndefined;
    })(ValueGuard || (exports.ValueGuard = ValueGuard = {}));
    var TypeGuardUnknownTypeError = class extends TypeBoxError {
    };
    exports.TypeGuardUnknownTypeError = TypeGuardUnknownTypeError;
    var TypeGuard;
    (function(TypeGuard2) {
      function IsPattern(value) {
        try {
          new RegExp(value);
          return true;
        } catch {
          return false;
        }
      }
      function IsControlCharacterFree(value) {
        if (!ValueGuard.IsString(value))
          return false;
        for (let i = 0; i < value.length; i++) {
          const code = value.charCodeAt(i);
          if (code >= 7 && code <= 13 || code === 27 || code === 127) {
            return false;
          }
        }
        return true;
      }
      function IsAdditionalProperties(value) {
        return IsOptionalBoolean(value) || TSchema(value);
      }
      function IsOptionalBigInt(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsBigInt(value);
      }
      function IsOptionalNumber(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsNumber(value);
      }
      function IsOptionalBoolean(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsBoolean(value);
      }
      function IsOptionalString(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value);
      }
      function IsOptionalPattern(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value) && IsControlCharacterFree(value) && IsPattern(value);
      }
      function IsOptionalFormat(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value) && IsControlCharacterFree(value);
      }
      function IsOptionalSchema(value) {
        return ValueGuard.IsUndefined(value) || TSchema(value);
      }
      function TAny(schema) {
        return TKindOf(schema, "Any") && IsOptionalString(schema.$id);
      }
      TypeGuard2.TAny = TAny;
      function TArray(schema) {
        return TKindOf(schema, "Array") && schema.type === "array" && IsOptionalString(schema.$id) && TSchema(schema.items) && IsOptionalNumber(schema.minItems) && IsOptionalNumber(schema.maxItems) && IsOptionalBoolean(schema.uniqueItems) && IsOptionalSchema(schema.contains) && IsOptionalNumber(schema.minContains) && IsOptionalNumber(schema.maxContains);
      }
      TypeGuard2.TArray = TArray;
      function TAsyncIterator(schema) {
        return TKindOf(schema, "AsyncIterator") && schema.type === "AsyncIterator" && IsOptionalString(schema.$id) && TSchema(schema.items);
      }
      TypeGuard2.TAsyncIterator = TAsyncIterator;
      function TBigInt(schema) {
        return TKindOf(schema, "BigInt") && schema.type === "bigint" && IsOptionalString(schema.$id) && IsOptionalBigInt(schema.exclusiveMaximum) && IsOptionalBigInt(schema.exclusiveMinimum) && IsOptionalBigInt(schema.maximum) && IsOptionalBigInt(schema.minimum) && IsOptionalBigInt(schema.multipleOf);
      }
      TypeGuard2.TBigInt = TBigInt;
      function TBoolean(schema) {
        return TKindOf(schema, "Boolean") && schema.type === "boolean" && IsOptionalString(schema.$id);
      }
      TypeGuard2.TBoolean = TBoolean;
      function TConstructor(schema) {
        return TKindOf(schema, "Constructor") && schema.type === "Constructor" && IsOptionalString(schema.$id) && ValueGuard.IsArray(schema.parameters) && schema.parameters.every((schema2) => TSchema(schema2)) && TSchema(schema.returns);
      }
      TypeGuard2.TConstructor = TConstructor;
      function TDate(schema) {
        return TKindOf(schema, "Date") && schema.type === "Date" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.exclusiveMaximumTimestamp) && IsOptionalNumber(schema.exclusiveMinimumTimestamp) && IsOptionalNumber(schema.maximumTimestamp) && IsOptionalNumber(schema.minimumTimestamp) && IsOptionalNumber(schema.multipleOfTimestamp);
      }
      TypeGuard2.TDate = TDate;
      function TFunction(schema) {
        return TKindOf(schema, "Function") && schema.type === "Function" && IsOptionalString(schema.$id) && ValueGuard.IsArray(schema.parameters) && schema.parameters.every((schema2) => TSchema(schema2)) && TSchema(schema.returns);
      }
      TypeGuard2.TFunction = TFunction;
      function TInteger(schema) {
        return TKindOf(schema, "Integer") && schema.type === "integer" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.exclusiveMaximum) && IsOptionalNumber(schema.exclusiveMinimum) && IsOptionalNumber(schema.maximum) && IsOptionalNumber(schema.minimum) && IsOptionalNumber(schema.multipleOf);
      }
      TypeGuard2.TInteger = TInteger;
      function TIntersect(schema) {
        return TKindOf(schema, "Intersect") && (ValueGuard.IsString(schema.type) && schema.type !== "object" ? false : true) && ValueGuard.IsArray(schema.allOf) && schema.allOf.every((schema2) => TSchema(schema2) && !TTransform(schema2)) && IsOptionalString(schema.type) && (IsOptionalBoolean(schema.unevaluatedProperties) || IsOptionalSchema(schema.unevaluatedProperties)) && IsOptionalString(schema.$id);
      }
      TypeGuard2.TIntersect = TIntersect;
      function TIterator(schema) {
        return TKindOf(schema, "Iterator") && schema.type === "Iterator" && IsOptionalString(schema.$id) && TSchema(schema.items);
      }
      TypeGuard2.TIterator = TIterator;
      function TKindOf(schema, kind) {
        return TKind(schema) && schema[exports.Kind] === kind;
      }
      TypeGuard2.TKindOf = TKindOf;
      function TKind(schema) {
        return ValueGuard.IsObject(schema) && exports.Kind in schema && ValueGuard.IsString(schema[exports.Kind]);
      }
      TypeGuard2.TKind = TKind;
      function TLiteralString(schema) {
        return TLiteral(schema) && ValueGuard.IsString(schema.const);
      }
      TypeGuard2.TLiteralString = TLiteralString;
      function TLiteralNumber(schema) {
        return TLiteral(schema) && ValueGuard.IsNumber(schema.const);
      }
      TypeGuard2.TLiteralNumber = TLiteralNumber;
      function TLiteralBoolean(schema) {
        return TLiteral(schema) && ValueGuard.IsBoolean(schema.const);
      }
      TypeGuard2.TLiteralBoolean = TLiteralBoolean;
      function TLiteral(schema) {
        return TKindOf(schema, "Literal") && IsOptionalString(schema.$id) && (ValueGuard.IsBoolean(schema.const) || ValueGuard.IsNumber(schema.const) || ValueGuard.IsString(schema.const));
      }
      TypeGuard2.TLiteral = TLiteral;
      function TNever(schema) {
        return TKindOf(schema, "Never") && ValueGuard.IsObject(schema.not) && Object.getOwnPropertyNames(schema.not).length === 0;
      }
      TypeGuard2.TNever = TNever;
      function TNot(schema) {
        return TKindOf(schema, "Not") && TSchema(schema.not);
      }
      TypeGuard2.TNot = TNot;
      function TNull(schema) {
        return TKindOf(schema, "Null") && schema.type === "null" && IsOptionalString(schema.$id);
      }
      TypeGuard2.TNull = TNull;
      function TNumber(schema) {
        return TKindOf(schema, "Number") && schema.type === "number" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.exclusiveMaximum) && IsOptionalNumber(schema.exclusiveMinimum) && IsOptionalNumber(schema.maximum) && IsOptionalNumber(schema.minimum) && IsOptionalNumber(schema.multipleOf);
      }
      TypeGuard2.TNumber = TNumber;
      function TObject(schema) {
        return TKindOf(schema, "Object") && schema.type === "object" && IsOptionalString(schema.$id) && ValueGuard.IsObject(schema.properties) && IsAdditionalProperties(schema.additionalProperties) && IsOptionalNumber(schema.minProperties) && IsOptionalNumber(schema.maxProperties) && Object.entries(schema.properties).every(([key, schema2]) => IsControlCharacterFree(key) && TSchema(schema2));
      }
      TypeGuard2.TObject = TObject;
      function TPromise(schema) {
        return TKindOf(schema, "Promise") && schema.type === "Promise" && IsOptionalString(schema.$id) && TSchema(schema.item);
      }
      TypeGuard2.TPromise = TPromise;
      function TRecord(schema) {
        return TKindOf(schema, "Record") && schema.type === "object" && IsOptionalString(schema.$id) && IsAdditionalProperties(schema.additionalProperties) && ValueGuard.IsObject(schema.patternProperties) && ((schema2) => {
          const keys = Object.getOwnPropertyNames(schema2.patternProperties);
          return keys.length === 1 && IsPattern(keys[0]) && ValueGuard.IsObject(schema2.patternProperties) && TSchema(schema2.patternProperties[keys[0]]);
        })(schema);
      }
      TypeGuard2.TRecord = TRecord;
      function TRecursive(schema) {
        return ValueGuard.IsObject(schema) && exports.Hint in schema && schema[exports.Hint] === "Recursive";
      }
      TypeGuard2.TRecursive = TRecursive;
      function TRef(schema) {
        return TKindOf(schema, "Ref") && IsOptionalString(schema.$id) && ValueGuard.IsString(schema.$ref);
      }
      TypeGuard2.TRef = TRef;
      function TString(schema) {
        return TKindOf(schema, "String") && schema.type === "string" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.minLength) && IsOptionalNumber(schema.maxLength) && IsOptionalPattern(schema.pattern) && IsOptionalFormat(schema.format);
      }
      TypeGuard2.TString = TString;
      function TSymbol(schema) {
        return TKindOf(schema, "Symbol") && schema.type === "symbol" && IsOptionalString(schema.$id);
      }
      TypeGuard2.TSymbol = TSymbol;
      function TTemplateLiteral(schema) {
        return TKindOf(schema, "TemplateLiteral") && schema.type === "string" && ValueGuard.IsString(schema.pattern) && schema.pattern[0] === "^" && schema.pattern[schema.pattern.length - 1] === "$";
      }
      TypeGuard2.TTemplateLiteral = TTemplateLiteral;
      function TThis(schema) {
        return TKindOf(schema, "This") && IsOptionalString(schema.$id) && ValueGuard.IsString(schema.$ref);
      }
      TypeGuard2.TThis = TThis;
      function TTransform(schema) {
        return ValueGuard.IsObject(schema) && exports.Transform in schema;
      }
      TypeGuard2.TTransform = TTransform;
      function TTuple(schema) {
        return TKindOf(schema, "Tuple") && schema.type === "array" && IsOptionalString(schema.$id) && ValueGuard.IsNumber(schema.minItems) && ValueGuard.IsNumber(schema.maxItems) && schema.minItems === schema.maxItems && // empty
        (ValueGuard.IsUndefined(schema.items) && ValueGuard.IsUndefined(schema.additionalItems) && schema.minItems === 0 || ValueGuard.IsArray(schema.items) && schema.items.every((schema2) => TSchema(schema2)));
      }
      TypeGuard2.TTuple = TTuple;
      function TUndefined(schema) {
        return TKindOf(schema, "Undefined") && schema.type === "undefined" && IsOptionalString(schema.$id);
      }
      TypeGuard2.TUndefined = TUndefined;
      function TUnionLiteral(schema) {
        return TUnion(schema) && schema.anyOf.every((schema2) => TLiteralString(schema2) || TLiteralNumber(schema2));
      }
      TypeGuard2.TUnionLiteral = TUnionLiteral;
      function TUnion(schema) {
        return TKindOf(schema, "Union") && IsOptionalString(schema.$id) && ValueGuard.IsObject(schema) && ValueGuard.IsArray(schema.anyOf) && schema.anyOf.every((schema2) => TSchema(schema2));
      }
      TypeGuard2.TUnion = TUnion;
      function TUint8Array(schema) {
        return TKindOf(schema, "Uint8Array") && schema.type === "Uint8Array" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.minByteLength) && IsOptionalNumber(schema.maxByteLength);
      }
      TypeGuard2.TUint8Array = TUint8Array;
      function TUnknown(schema) {
        return TKindOf(schema, "Unknown") && IsOptionalString(schema.$id);
      }
      TypeGuard2.TUnknown = TUnknown;
      function TUnsafe(schema) {
        return TKindOf(schema, "Unsafe");
      }
      TypeGuard2.TUnsafe = TUnsafe;
      function TVoid(schema) {
        return TKindOf(schema, "Void") && schema.type === "void" && IsOptionalString(schema.$id);
      }
      TypeGuard2.TVoid = TVoid;
      function TReadonly(schema) {
        return ValueGuard.IsObject(schema) && schema[exports.Readonly] === "Readonly";
      }
      TypeGuard2.TReadonly = TReadonly;
      function TOptional(schema) {
        return ValueGuard.IsObject(schema) && schema[exports.Optional] === "Optional";
      }
      TypeGuard2.TOptional = TOptional;
      function TSchema(schema) {
        return ValueGuard.IsObject(schema) && (TAny(schema) || TArray(schema) || TBoolean(schema) || TBigInt(schema) || TAsyncIterator(schema) || TConstructor(schema) || TDate(schema) || TFunction(schema) || TInteger(schema) || TIntersect(schema) || TIterator(schema) || TLiteral(schema) || TNever(schema) || TNot(schema) || TNull(schema) || TNumber(schema) || TObject(schema) || TPromise(schema) || TRecord(schema) || TRef(schema) || TString(schema) || TSymbol(schema) || TTemplateLiteral(schema) || TThis(schema) || TTuple(schema) || TUndefined(schema) || TUnion(schema) || TUint8Array(schema) || TUnknown(schema) || TUnsafe(schema) || TVoid(schema) || TKind(schema) && TypeRegistry.Has(schema[exports.Kind]));
      }
      TypeGuard2.TSchema = TSchema;
    })(TypeGuard || (exports.TypeGuard = TypeGuard = {}));
    var ExtendsUndefined;
    (function(ExtendsUndefined2) {
      function Check(schema) {
        return schema[exports.Kind] === "Intersect" ? schema.allOf.every((schema2) => Check(schema2)) : schema[exports.Kind] === "Union" ? schema.anyOf.some((schema2) => Check(schema2)) : schema[exports.Kind] === "Undefined" ? true : schema[exports.Kind] === "Not" ? !Check(schema.not) : false;
      }
      ExtendsUndefined2.Check = Check;
    })(ExtendsUndefined || (exports.ExtendsUndefined = ExtendsUndefined = {}));
    var TypeExtendsError = class extends TypeBoxError {
    };
    exports.TypeExtendsError = TypeExtendsError;
    var TypeExtendsResult;
    (function(TypeExtendsResult2) {
      TypeExtendsResult2[TypeExtendsResult2["Union"] = 0] = "Union";
      TypeExtendsResult2[TypeExtendsResult2["True"] = 1] = "True";
      TypeExtendsResult2[TypeExtendsResult2["False"] = 2] = "False";
    })(TypeExtendsResult || (exports.TypeExtendsResult = TypeExtendsResult = {}));
    var TypeExtends;
    (function(TypeExtends2) {
      function IntoBooleanResult(result) {
        return result === TypeExtendsResult.False ? result : TypeExtendsResult.True;
      }
      function Throw(message) {
        throw new TypeExtendsError(message);
      }
      function IsStructuralRight(right) {
        return TypeGuard.TNever(right) || TypeGuard.TIntersect(right) || TypeGuard.TUnion(right) || TypeGuard.TUnknown(right) || TypeGuard.TAny(right);
      }
      function StructuralRight(left, right) {
        return TypeGuard.TNever(right) ? TNeverRight(left, right) : TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) ? TUnionRight(left, right) : TypeGuard.TUnknown(right) ? TUnknownRight(left, right) : TypeGuard.TAny(right) ? TAnyRight(left, right) : Throw("StructuralRight");
      }
      function TAnyRight(left, right) {
        return TypeExtendsResult.True;
      }
      function TAny(left, right) {
        return TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) && right.anyOf.some((schema) => TypeGuard.TAny(schema) || TypeGuard.TUnknown(schema)) ? TypeExtendsResult.True : TypeGuard.TUnion(right) ? TypeExtendsResult.Union : TypeGuard.TUnknown(right) ? TypeExtendsResult.True : TypeGuard.TAny(right) ? TypeExtendsResult.True : TypeExtendsResult.Union;
      }
      function TArrayRight(left, right) {
        return TypeGuard.TUnknown(left) ? TypeExtendsResult.False : TypeGuard.TAny(left) ? TypeExtendsResult.Union : TypeGuard.TNever(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TArray(left, right) {
        return TypeGuard.TObject(right) && IsObjectArrayLike(right) ? TypeExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !TypeGuard.TArray(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.items, right.items));
      }
      function TAsyncIterator(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : !TypeGuard.TAsyncIterator(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.items, right.items));
      }
      function TBigInt(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TBigInt(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TBooleanRight(left, right) {
        return TypeGuard.TLiteral(left) && ValueGuard.IsBoolean(left.const) ? TypeExtendsResult.True : TypeGuard.TBoolean(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TBoolean(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TBoolean(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TConstructor(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : !TypeGuard.TConstructor(right) ? TypeExtendsResult.False : left.parameters.length > right.parameters.length ? TypeExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit(right.parameters[index], schema)) === TypeExtendsResult.True) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.returns, right.returns));
      }
      function TDate(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TDate(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TFunction(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : !TypeGuard.TFunction(right) ? TypeExtendsResult.False : left.parameters.length > right.parameters.length ? TypeExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit(right.parameters[index], schema)) === TypeExtendsResult.True) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.returns, right.returns));
      }
      function TIntegerRight(left, right) {
        return TypeGuard.TLiteral(left) && ValueGuard.IsNumber(left.const) ? TypeExtendsResult.True : TypeGuard.TNumber(left) || TypeGuard.TInteger(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TInteger(left, right) {
        return TypeGuard.TInteger(right) || TypeGuard.TNumber(right) ? TypeExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeExtendsResult.False;
      }
      function TIntersectRight(left, right) {
        return right.allOf.every((schema) => Visit(left, schema) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TIntersect(left, right) {
        return left.allOf.some((schema) => Visit(schema, right) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TIterator(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : !TypeGuard.TIterator(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.items, right.items));
      }
      function TLiteral(left, right) {
        return TypeGuard.TLiteral(right) && right.const === left.const ? TypeExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TString(right) ? TStringRight(left, right) : TypeGuard.TNumber(right) ? TNumberRight(left, right) : TypeGuard.TInteger(right) ? TIntegerRight(left, right) : TypeGuard.TBoolean(right) ? TBooleanRight(left, right) : TypeExtendsResult.False;
      }
      function TNeverRight(left, right) {
        return TypeExtendsResult.False;
      }
      function TNever(left, right) {
        return TypeExtendsResult.True;
      }
      function UnwrapTNot(schema) {
        let [current, depth] = [schema, 0];
        while (true) {
          if (!TypeGuard.TNot(current))
            break;
          current = current.not;
          depth += 1;
        }
        return depth % 2 === 0 ? current : exports.Type.Unknown();
      }
      function TNot(left, right) {
        return TypeGuard.TNot(left) ? Visit(UnwrapTNot(left), right) : TypeGuard.TNot(right) ? Visit(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
      }
      function TNull(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TNull(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TNumberRight(left, right) {
        return TypeGuard.TLiteralNumber(left) ? TypeExtendsResult.True : TypeGuard.TNumber(left) || TypeGuard.TInteger(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TNumber(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TInteger(right) || TypeGuard.TNumber(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function IsObjectPropertyCount(schema, count) {
        return Object.getOwnPropertyNames(schema.properties).length === count;
      }
      function IsObjectStringLike(schema) {
        return IsObjectArrayLike(schema);
      }
      function IsObjectSymbolLike(schema) {
        return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && TypeGuard.TUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (TypeGuard.TString(schema.properties.description.anyOf[0]) && TypeGuard.TUndefined(schema.properties.description.anyOf[1]) || TypeGuard.TString(schema.properties.description.anyOf[1]) && TypeGuard.TUndefined(schema.properties.description.anyOf[0]));
      }
      function IsObjectNumberLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectBooleanLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectBigIntLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectDateLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectUint8ArrayLike(schema) {
        return IsObjectArrayLike(schema);
      }
      function IsObjectFunctionLike(schema) {
        const length = exports.Type.Number();
        return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit(schema.properties["length"], length)) === TypeExtendsResult.True;
      }
      function IsObjectConstructorLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectArrayLike(schema) {
        const length = exports.Type.Number();
        return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit(schema.properties["length"], length)) === TypeExtendsResult.True;
      }
      function IsObjectPromiseLike(schema) {
        const then = exports.Type.Function([exports.Type.Any()], exports.Type.Any());
        return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit(schema.properties["then"], then)) === TypeExtendsResult.True;
      }
      function Property(left, right) {
        return Visit(left, right) === TypeExtendsResult.False ? TypeExtendsResult.False : TypeGuard.TOptional(left) && !TypeGuard.TOptional(right) ? TypeExtendsResult.False : TypeExtendsResult.True;
      }
      function TObjectRight(left, right) {
        return TypeGuard.TUnknown(left) ? TypeExtendsResult.False : TypeGuard.TAny(left) ? TypeExtendsResult.Union : TypeGuard.TNever(left) || TypeGuard.TLiteralString(left) && IsObjectStringLike(right) || TypeGuard.TLiteralNumber(left) && IsObjectNumberLike(right) || TypeGuard.TLiteralBoolean(left) && IsObjectBooleanLike(right) || TypeGuard.TSymbol(left) && IsObjectSymbolLike(right) || TypeGuard.TBigInt(left) && IsObjectBigIntLike(right) || TypeGuard.TString(left) && IsObjectStringLike(right) || TypeGuard.TSymbol(left) && IsObjectSymbolLike(right) || TypeGuard.TNumber(left) && IsObjectNumberLike(right) || TypeGuard.TInteger(left) && IsObjectNumberLike(right) || TypeGuard.TBoolean(left) && IsObjectBooleanLike(right) || TypeGuard.TUint8Array(left) && IsObjectUint8ArrayLike(right) || TypeGuard.TDate(left) && IsObjectDateLike(right) || TypeGuard.TConstructor(left) && IsObjectConstructorLike(right) || TypeGuard.TFunction(left) && IsObjectFunctionLike(right) ? TypeExtendsResult.True : TypeGuard.TRecord(left) && TypeGuard.TString(RecordKey(left)) ? (() => {
          return right[exports.Hint] === "Record" ? TypeExtendsResult.True : TypeExtendsResult.False;
        })() : TypeGuard.TRecord(left) && TypeGuard.TNumber(RecordKey(left)) ? (() => {
          return IsObjectPropertyCount(right, 0) ? TypeExtendsResult.True : TypeExtendsResult.False;
        })() : TypeExtendsResult.False;
      }
      function TObject(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : !TypeGuard.TObject(right) ? TypeExtendsResult.False : (() => {
          for (const key of Object.getOwnPropertyNames(right.properties)) {
            if (!(key in left.properties) && !TypeGuard.TOptional(right.properties[key])) {
              return TypeExtendsResult.False;
            }
            if (TypeGuard.TOptional(right.properties[key])) {
              return TypeExtendsResult.True;
            }
            if (Property(left.properties[key], right.properties[key]) === TypeExtendsResult.False) {
              return TypeExtendsResult.False;
            }
          }
          return TypeExtendsResult.True;
        })();
      }
      function TPromise(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) && IsObjectPromiseLike(right) ? TypeExtendsResult.True : !TypeGuard.TPromise(right) ? TypeExtendsResult.False : IntoBooleanResult(Visit(left.item, right.item));
      }
      function RecordKey(schema) {
        return exports.PatternNumberExact in schema.patternProperties ? exports.Type.Number() : exports.PatternStringExact in schema.patternProperties ? exports.Type.String() : Throw("Unknown record key pattern");
      }
      function RecordValue(schema) {
        return exports.PatternNumberExact in schema.patternProperties ? schema.patternProperties[exports.PatternNumberExact] : exports.PatternStringExact in schema.patternProperties ? schema.patternProperties[exports.PatternStringExact] : Throw("Unable to get record value schema");
      }
      function TRecordRight(left, right) {
        const [Key, Value] = [RecordKey(right), RecordValue(right)];
        return TypeGuard.TLiteralString(left) && TypeGuard.TNumber(Key) && IntoBooleanResult(Visit(left, Value)) === TypeExtendsResult.True ? TypeExtendsResult.True : TypeGuard.TUint8Array(left) && TypeGuard.TNumber(Key) ? Visit(left, Value) : TypeGuard.TString(left) && TypeGuard.TNumber(Key) ? Visit(left, Value) : TypeGuard.TArray(left) && TypeGuard.TNumber(Key) ? Visit(left, Value) : TypeGuard.TObject(left) ? (() => {
          for (const key of Object.getOwnPropertyNames(left.properties)) {
            if (Property(Value, left.properties[key]) === TypeExtendsResult.False) {
              return TypeExtendsResult.False;
            }
          }
          return TypeExtendsResult.True;
        })() : TypeExtendsResult.False;
      }
      function TRecord(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : !TypeGuard.TRecord(right) ? TypeExtendsResult.False : Visit(RecordValue(left), RecordValue(right));
      }
      function TStringRight(left, right) {
        return TypeGuard.TLiteral(left) && ValueGuard.IsString(left.const) ? TypeExtendsResult.True : TypeGuard.TString(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TString(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TString(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TSymbol(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TSymbol(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TTemplateLiteral(left, right) {
        return TypeGuard.TTemplateLiteral(left) ? Visit(TemplateLiteralResolver.Resolve(left), right) : TypeGuard.TTemplateLiteral(right) ? Visit(left, TemplateLiteralResolver.Resolve(right)) : Throw("Invalid fallthrough for TemplateLiteral");
      }
      function IsArrayOfTuple(left, right) {
        return TypeGuard.TArray(right) && left.items !== void 0 && left.items.every((schema) => Visit(schema, right.items) === TypeExtendsResult.True);
      }
      function TTupleRight(left, right) {
        return TypeGuard.TNever(left) ? TypeExtendsResult.True : TypeGuard.TUnknown(left) ? TypeExtendsResult.False : TypeGuard.TAny(left) ? TypeExtendsResult.Union : TypeExtendsResult.False;
      }
      function TTuple(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) && IsObjectArrayLike(right) ? TypeExtendsResult.True : TypeGuard.TArray(right) && IsArrayOfTuple(left, right) ? TypeExtendsResult.True : !TypeGuard.TTuple(right) ? TypeExtendsResult.False : ValueGuard.IsUndefined(left.items) && !ValueGuard.IsUndefined(right.items) || !ValueGuard.IsUndefined(left.items) && ValueGuard.IsUndefined(right.items) ? TypeExtendsResult.False : ValueGuard.IsUndefined(left.items) && !ValueGuard.IsUndefined(right.items) ? TypeExtendsResult.True : left.items.every((schema, index) => Visit(schema, right.items[index]) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TUint8Array(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TUint8Array(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TUndefined(left, right) {
        return IsStructuralRight(right) ? StructuralRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TRecord(right) ? TRecordRight(left, right) : TypeGuard.TVoid(right) ? VoidRight(left, right) : TypeGuard.TUndefined(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TUnionRight(left, right) {
        return right.anyOf.some((schema) => Visit(left, schema) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TUnion(left, right) {
        return left.anyOf.every((schema) => Visit(schema, right) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TUnknownRight(left, right) {
        return TypeExtendsResult.True;
      }
      function TUnknown(left, right) {
        return TypeGuard.TNever(right) ? TNeverRight(left, right) : TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) ? TUnionRight(left, right) : TypeGuard.TAny(right) ? TAnyRight(left, right) : TypeGuard.TString(right) ? TStringRight(left, right) : TypeGuard.TNumber(right) ? TNumberRight(left, right) : TypeGuard.TInteger(right) ? TIntegerRight(left, right) : TypeGuard.TBoolean(right) ? TBooleanRight(left, right) : TypeGuard.TArray(right) ? TArrayRight(left, right) : TypeGuard.TTuple(right) ? TTupleRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TUnknown(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function VoidRight(left, right) {
        return TypeGuard.TUndefined(left) ? TypeExtendsResult.True : TypeGuard.TUndefined(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function TVoid(left, right) {
        return TypeGuard.TIntersect(right) ? TIntersectRight(left, right) : TypeGuard.TUnion(right) ? TUnionRight(left, right) : TypeGuard.TUnknown(right) ? TUnknownRight(left, right) : TypeGuard.TAny(right) ? TAnyRight(left, right) : TypeGuard.TObject(right) ? TObjectRight(left, right) : TypeGuard.TVoid(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      function Visit(left, right) {
        return (
          // resolvable
          TypeGuard.TTemplateLiteral(left) || TypeGuard.TTemplateLiteral(right) ? TTemplateLiteral(left, right) : TypeGuard.TNot(left) || TypeGuard.TNot(right) ? TNot(left, right) : (
            // standard
            TypeGuard.TAny(left) ? TAny(left, right) : TypeGuard.TArray(left) ? TArray(left, right) : TypeGuard.TBigInt(left) ? TBigInt(left, right) : TypeGuard.TBoolean(left) ? TBoolean(left, right) : TypeGuard.TAsyncIterator(left) ? TAsyncIterator(left, right) : TypeGuard.TConstructor(left) ? TConstructor(left, right) : TypeGuard.TDate(left) ? TDate(left, right) : TypeGuard.TFunction(left) ? TFunction(left, right) : TypeGuard.TInteger(left) ? TInteger(left, right) : TypeGuard.TIntersect(left) ? TIntersect(left, right) : TypeGuard.TIterator(left) ? TIterator(left, right) : TypeGuard.TLiteral(left) ? TLiteral(left, right) : TypeGuard.TNever(left) ? TNever(left, right) : TypeGuard.TNull(left) ? TNull(left, right) : TypeGuard.TNumber(left) ? TNumber(left, right) : TypeGuard.TObject(left) ? TObject(left, right) : TypeGuard.TRecord(left) ? TRecord(left, right) : TypeGuard.TString(left) ? TString(left, right) : TypeGuard.TSymbol(left) ? TSymbol(left, right) : TypeGuard.TTuple(left) ? TTuple(left, right) : TypeGuard.TPromise(left) ? TPromise(left, right) : TypeGuard.TUint8Array(left) ? TUint8Array(left, right) : TypeGuard.TUndefined(left) ? TUndefined(left, right) : TypeGuard.TUnion(left) ? TUnion(left, right) : TypeGuard.TUnknown(left) ? TUnknown(left, right) : TypeGuard.TVoid(left) ? TVoid(left, right) : Throw(`Unknown left type operand '${left[exports.Kind]}'`)
          )
        );
      }
      function Extends(left, right) {
        return Visit(left, right);
      }
      TypeExtends2.Extends = Extends;
    })(TypeExtends || (exports.TypeExtends = TypeExtends = {}));
    var TypeClone;
    (function(TypeClone2) {
      function ArrayType(value) {
        return value.map((value2) => Visit(value2));
      }
      function DateType(value) {
        return new Date(value.getTime());
      }
      function Uint8ArrayType(value) {
        return new Uint8Array(value);
      }
      function ObjectType(value) {
        const clonedProperties = Object.getOwnPropertyNames(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
        const clonedSymbols = Object.getOwnPropertySymbols(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
        return { ...clonedProperties, ...clonedSymbols };
      }
      function Visit(value) {
        return ValueGuard.IsArray(value) ? ArrayType(value) : ValueGuard.IsDate(value) ? DateType(value) : ValueGuard.IsUint8Array(value) ? Uint8ArrayType(value) : ValueGuard.IsObject(value) ? ObjectType(value) : value;
      }
      function Rest(schemas) {
        return schemas.map((schema) => Type7(schema));
      }
      TypeClone2.Rest = Rest;
      function Type7(schema, options = {}) {
        return { ...Visit(schema), ...options };
      }
      TypeClone2.Type = Type7;
    })(TypeClone || (exports.TypeClone = TypeClone = {}));
    var IndexedAccessor;
    (function(IndexedAccessor2) {
      function OptionalUnwrap(schema) {
        return schema.map((schema2) => {
          const { [exports.Optional]: _, ...clone } = TypeClone.Type(schema2);
          return clone;
        });
      }
      function IsIntersectOptional(schema) {
        return schema.every((schema2) => TypeGuard.TOptional(schema2));
      }
      function IsUnionOptional(schema) {
        return schema.some((schema2) => TypeGuard.TOptional(schema2));
      }
      function ResolveIntersect(schema) {
        return IsIntersectOptional(schema.allOf) ? exports.Type.Optional(exports.Type.Intersect(OptionalUnwrap(schema.allOf))) : schema;
      }
      function ResolveUnion(schema) {
        return IsUnionOptional(schema.anyOf) ? exports.Type.Optional(exports.Type.Union(OptionalUnwrap(schema.anyOf))) : schema;
      }
      function ResolveOptional(schema) {
        return schema[exports.Kind] === "Intersect" ? ResolveIntersect(schema) : schema[exports.Kind] === "Union" ? ResolveUnion(schema) : schema;
      }
      function TIntersect(schema, key) {
        const resolved = schema.allOf.reduce((acc, schema2) => {
          const indexed = Visit(schema2, key);
          return indexed[exports.Kind] === "Never" ? acc : [...acc, indexed];
        }, []);
        return ResolveOptional(exports.Type.Intersect(resolved));
      }
      function TUnion(schema, key) {
        const resolved = schema.anyOf.map((schema2) => Visit(schema2, key));
        return ResolveOptional(exports.Type.Union(resolved));
      }
      function TObject(schema, key) {
        const property = schema.properties[key];
        return ValueGuard.IsUndefined(property) ? exports.Type.Never() : exports.Type.Union([property]);
      }
      function TTuple(schema, key) {
        const items = schema.items;
        if (ValueGuard.IsUndefined(items))
          return exports.Type.Never();
        const element = items[key];
        if (ValueGuard.IsUndefined(element))
          return exports.Type.Never();
        return element;
      }
      function Visit(schema, key) {
        return schema[exports.Kind] === "Intersect" ? TIntersect(schema, key) : schema[exports.Kind] === "Union" ? TUnion(schema, key) : schema[exports.Kind] === "Object" ? TObject(schema, key) : schema[exports.Kind] === "Tuple" ? TTuple(schema, key) : exports.Type.Never();
      }
      function Resolve(schema, keys, options = {}) {
        const resolved = keys.map((key) => Visit(schema, key.toString()));
        return ResolveOptional(exports.Type.Union(resolved, options));
      }
      IndexedAccessor2.Resolve = Resolve;
    })(IndexedAccessor || (exports.IndexedAccessor = IndexedAccessor = {}));
    var Intrinsic;
    (function(Intrinsic2) {
      function Uncapitalize(value) {
        const [first, rest] = [value.slice(0, 1), value.slice(1)];
        return `${first.toLowerCase()}${rest}`;
      }
      function Capitalize(value) {
        const [first, rest] = [value.slice(0, 1), value.slice(1)];
        return `${first.toUpperCase()}${rest}`;
      }
      function Uppercase(value) {
        return value.toUpperCase();
      }
      function Lowercase(value) {
        return value.toLowerCase();
      }
      function IntrinsicTemplateLiteral(schema, mode) {
        const expression = TemplateLiteralParser.ParseExact(schema.pattern);
        const finite = TemplateLiteralFinite.Check(expression);
        if (!finite)
          return { ...schema, pattern: IntrinsicLiteral(schema.pattern, mode) };
        const strings = [...TemplateLiteralGenerator.Generate(expression)];
        const literals = strings.map((value) => exports.Type.Literal(value));
        const mapped = IntrinsicRest(literals, mode);
        const union = exports.Type.Union(mapped);
        return exports.Type.TemplateLiteral([union]);
      }
      function IntrinsicLiteral(value, mode) {
        return typeof value === "string" ? mode === "Uncapitalize" ? Uncapitalize(value) : mode === "Capitalize" ? Capitalize(value) : mode === "Uppercase" ? Uppercase(value) : mode === "Lowercase" ? Lowercase(value) : value : value.toString();
      }
      function IntrinsicRest(schema, mode) {
        if (schema.length === 0)
          return [];
        const [L, ...R] = schema;
        return [Map2(L, mode), ...IntrinsicRest(R, mode)];
      }
      function Visit(schema, mode) {
        return TypeGuard.TTemplateLiteral(schema) ? IntrinsicTemplateLiteral(schema, mode) : TypeGuard.TUnion(schema) ? exports.Type.Union(IntrinsicRest(schema.anyOf, mode)) : TypeGuard.TLiteral(schema) ? exports.Type.Literal(IntrinsicLiteral(schema.const, mode)) : schema;
      }
      function Map2(schema, mode) {
        return Visit(schema, mode);
      }
      Intrinsic2.Map = Map2;
    })(Intrinsic || (exports.Intrinsic = Intrinsic = {}));
    var ObjectMap;
    (function(ObjectMap2) {
      function TIntersect(schema, callback) {
        return exports.Type.Intersect(schema.allOf.map((inner) => Visit(inner, callback)), { ...schema });
      }
      function TUnion(schema, callback) {
        return exports.Type.Union(schema.anyOf.map((inner) => Visit(inner, callback)), { ...schema });
      }
      function TObject(schema, callback) {
        return callback(schema);
      }
      function Visit(schema, callback) {
        return schema[exports.Kind] === "Intersect" ? TIntersect(schema, callback) : schema[exports.Kind] === "Union" ? TUnion(schema, callback) : schema[exports.Kind] === "Object" ? TObject(schema, callback) : schema;
      }
      function Map2(schema, callback, options) {
        return { ...Visit(TypeClone.Type(schema), callback), ...options };
      }
      ObjectMap2.Map = Map2;
    })(ObjectMap || (exports.ObjectMap = ObjectMap = {}));
    var KeyResolver;
    (function(KeyResolver2) {
      function UnwrapPattern(key) {
        return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
      }
      function TIntersect(schema, options) {
        return schema.allOf.reduce((acc, schema2) => [...acc, ...Visit(schema2, options)], []);
      }
      function TUnion(schema, options) {
        const sets = schema.anyOf.map((inner) => Visit(inner, options));
        return [...sets.reduce((set, outer) => outer.map((key) => sets.every((inner) => inner.includes(key)) ? set.add(key) : set)[0], /* @__PURE__ */ new Set())];
      }
      function TObject(schema, options) {
        return Object.getOwnPropertyNames(schema.properties);
      }
      function TRecord(schema, options) {
        return options.includePatterns ? Object.getOwnPropertyNames(schema.patternProperties) : [];
      }
      function Visit(schema, options) {
        return TypeGuard.TIntersect(schema) ? TIntersect(schema, options) : TypeGuard.TUnion(schema) ? TUnion(schema, options) : TypeGuard.TObject(schema) ? TObject(schema, options) : TypeGuard.TRecord(schema) ? TRecord(schema, options) : [];
      }
      function ResolveKeys(schema, options) {
        return [...new Set(Visit(schema, options))];
      }
      KeyResolver2.ResolveKeys = ResolveKeys;
      function ResolvePattern(schema) {
        const keys = ResolveKeys(schema, { includePatterns: true });
        const pattern2 = keys.map((key) => `(${UnwrapPattern(key)})`);
        return `^(${pattern2.join("|")})$`;
      }
      KeyResolver2.ResolvePattern = ResolvePattern;
    })(KeyResolver || (exports.KeyResolver = KeyResolver = {}));
    var KeyArrayResolverError = class extends TypeBoxError {
    };
    exports.KeyArrayResolverError = KeyArrayResolverError;
    var KeyArrayResolver;
    (function(KeyArrayResolver2) {
      function Resolve(schema) {
        return Array.isArray(schema) ? schema : TypeGuard.TUnionLiteral(schema) ? schema.anyOf.map((schema2) => schema2.const.toString()) : TypeGuard.TLiteral(schema) ? [schema.const] : TypeGuard.TTemplateLiteral(schema) ? (() => {
          const expression = TemplateLiteralParser.ParseExact(schema.pattern);
          if (!TemplateLiteralFinite.Check(expression))
            throw new KeyArrayResolverError("Cannot resolve keys from infinite template expression");
          return [...TemplateLiteralGenerator.Generate(expression)];
        })() : [];
      }
      KeyArrayResolver2.Resolve = Resolve;
    })(KeyArrayResolver || (exports.KeyArrayResolver = KeyArrayResolver = {}));
    var UnionResolver;
    (function(UnionResolver2) {
      function* TUnion(union) {
        for (const schema of union.anyOf) {
          if (schema[exports.Kind] === "Union") {
            yield* TUnion(schema);
          } else {
            yield schema;
          }
        }
      }
      function Resolve(union) {
        return exports.Type.Union([...TUnion(union)], { ...union });
      }
      UnionResolver2.Resolve = Resolve;
    })(UnionResolver || (exports.UnionResolver = UnionResolver = {}));
    var TemplateLiteralPatternError = class extends TypeBoxError {
    };
    exports.TemplateLiteralPatternError = TemplateLiteralPatternError;
    var TemplateLiteralPattern;
    (function(TemplateLiteralPattern2) {
      function Throw(message) {
        throw new TemplateLiteralPatternError(message);
      }
      function Escape(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function Visit(schema, acc) {
        return TypeGuard.TTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : TypeGuard.TUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit(schema2, acc)).join("|")})` : TypeGuard.TNumber(schema) ? `${acc}${exports.PatternNumber}` : TypeGuard.TInteger(schema) ? `${acc}${exports.PatternNumber}` : TypeGuard.TBigInt(schema) ? `${acc}${exports.PatternNumber}` : TypeGuard.TString(schema) ? `${acc}${exports.PatternString}` : TypeGuard.TLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : TypeGuard.TBoolean(schema) ? `${acc}${exports.PatternBoolean}` : Throw(`Unexpected Kind '${schema[exports.Kind]}'`);
      }
      function Create(kinds) {
        return `^${kinds.map((schema) => Visit(schema, "")).join("")}$`;
      }
      TemplateLiteralPattern2.Create = Create;
    })(TemplateLiteralPattern || (exports.TemplateLiteralPattern = TemplateLiteralPattern = {}));
    var TemplateLiteralResolver;
    (function(TemplateLiteralResolver2) {
      function Resolve(template) {
        const expression = TemplateLiteralParser.ParseExact(template.pattern);
        if (!TemplateLiteralFinite.Check(expression))
          return exports.Type.String();
        const literals = [...TemplateLiteralGenerator.Generate(expression)].map((value) => exports.Type.Literal(value));
        return exports.Type.Union(literals);
      }
      TemplateLiteralResolver2.Resolve = Resolve;
    })(TemplateLiteralResolver || (exports.TemplateLiteralResolver = TemplateLiteralResolver = {}));
    var TemplateLiteralParserError = class extends TypeBoxError {
    };
    exports.TemplateLiteralParserError = TemplateLiteralParserError;
    var TemplateLiteralParser;
    (function(TemplateLiteralParser2) {
      function IsNonEscaped(pattern2, index, char) {
        return pattern2[index] === char && pattern2.charCodeAt(index - 1) !== 92;
      }
      function IsOpenParen(pattern2, index) {
        return IsNonEscaped(pattern2, index, "(");
      }
      function IsCloseParen(pattern2, index) {
        return IsNonEscaped(pattern2, index, ")");
      }
      function IsSeparator(pattern2, index) {
        return IsNonEscaped(pattern2, index, "|");
      }
      function IsGroup(pattern2) {
        if (!(IsOpenParen(pattern2, 0) && IsCloseParen(pattern2, pattern2.length - 1)))
          return false;
        let count = 0;
        for (let index = 0; index < pattern2.length; index++) {
          if (IsOpenParen(pattern2, index))
            count += 1;
          if (IsCloseParen(pattern2, index))
            count -= 1;
          if (count === 0 && index !== pattern2.length - 1)
            return false;
        }
        return true;
      }
      function InGroup(pattern2) {
        return pattern2.slice(1, pattern2.length - 1);
      }
      function IsPrecedenceOr(pattern2) {
        let count = 0;
        for (let index = 0; index < pattern2.length; index++) {
          if (IsOpenParen(pattern2, index))
            count += 1;
          if (IsCloseParen(pattern2, index))
            count -= 1;
          if (IsSeparator(pattern2, index) && count === 0)
            return true;
        }
        return false;
      }
      function IsPrecedenceAnd(pattern2) {
        for (let index = 0; index < pattern2.length; index++) {
          if (IsOpenParen(pattern2, index))
            return true;
        }
        return false;
      }
      function Or(pattern2) {
        let [count, start] = [0, 0];
        const expressions = [];
        for (let index = 0; index < pattern2.length; index++) {
          if (IsOpenParen(pattern2, index))
            count += 1;
          if (IsCloseParen(pattern2, index))
            count -= 1;
          if (IsSeparator(pattern2, index) && count === 0) {
            const range2 = pattern2.slice(start, index);
            if (range2.length > 0)
              expressions.push(Parse(range2));
            start = index + 1;
          }
        }
        const range = pattern2.slice(start);
        if (range.length > 0)
          expressions.push(Parse(range));
        if (expressions.length === 0)
          return { type: "const", const: "" };
        if (expressions.length === 1)
          return expressions[0];
        return { type: "or", expr: expressions };
      }
      function And(pattern2) {
        function Group(value, index) {
          if (!IsOpenParen(value, index))
            throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
          let count = 0;
          for (let scan = index; scan < value.length; scan++) {
            if (IsOpenParen(value, scan))
              count += 1;
            if (IsCloseParen(value, scan))
              count -= 1;
            if (count === 0)
              return [index, scan];
          }
          throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
        }
        function Range(pattern3, index) {
          for (let scan = index; scan < pattern3.length; scan++) {
            if (IsOpenParen(pattern3, scan))
              return [index, scan];
          }
          return [index, pattern3.length];
        }
        const expressions = [];
        for (let index = 0; index < pattern2.length; index++) {
          if (IsOpenParen(pattern2, index)) {
            const [start, end] = Group(pattern2, index);
            const range = pattern2.slice(start, end + 1);
            expressions.push(Parse(range));
            index = end;
          } else {
            const [start, end] = Range(pattern2, index);
            const range = pattern2.slice(start, end);
            if (range.length > 0)
              expressions.push(Parse(range));
            index = end - 1;
          }
        }
        return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
      }
      function Parse(pattern2) {
        return IsGroup(pattern2) ? Parse(InGroup(pattern2)) : IsPrecedenceOr(pattern2) ? Or(pattern2) : IsPrecedenceAnd(pattern2) ? And(pattern2) : { type: "const", const: pattern2 };
      }
      TemplateLiteralParser2.Parse = Parse;
      function ParseExact(pattern2) {
        return Parse(pattern2.slice(1, pattern2.length - 1));
      }
      TemplateLiteralParser2.ParseExact = ParseExact;
    })(TemplateLiteralParser || (exports.TemplateLiteralParser = TemplateLiteralParser = {}));
    var TemplateLiteralFiniteError = class extends TypeBoxError {
    };
    exports.TemplateLiteralFiniteError = TemplateLiteralFiniteError;
    var TemplateLiteralFinite;
    (function(TemplateLiteralFinite2) {
      function Throw(message) {
        throw new TemplateLiteralFiniteError(message);
      }
      function IsNumber(expression) {
        return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
      }
      function IsBoolean(expression) {
        return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
      }
      function IsString(expression) {
        return expression.type === "const" && expression.const === ".*";
      }
      function Check(expression) {
        return IsBoolean(expression) ? true : IsNumber(expression) || IsString(expression) ? false : expression.type === "and" ? expression.expr.every((expr) => Check(expr)) : expression.type === "or" ? expression.expr.every((expr) => Check(expr)) : expression.type === "const" ? true : Throw(`Unknown expression type`);
      }
      TemplateLiteralFinite2.Check = Check;
    })(TemplateLiteralFinite || (exports.TemplateLiteralFinite = TemplateLiteralFinite = {}));
    var TemplateLiteralGeneratorError = class extends TypeBoxError {
    };
    exports.TemplateLiteralGeneratorError = TemplateLiteralGeneratorError;
    var TemplateLiteralGenerator;
    (function(TemplateLiteralGenerator2) {
      function* Reduce(buffer) {
        if (buffer.length === 1)
          return yield* buffer[0];
        for (const left of buffer[0]) {
          for (const right of Reduce(buffer.slice(1))) {
            yield `${left}${right}`;
          }
        }
      }
      function* And(expression) {
        return yield* Reduce(expression.expr.map((expr) => [...Generate(expr)]));
      }
      function* Or(expression) {
        for (const expr of expression.expr)
          yield* Generate(expr);
      }
      function* Const(expression) {
        return yield expression.const;
      }
      function* Generate(expression) {
        return expression.type === "and" ? yield* And(expression) : expression.type === "or" ? yield* Or(expression) : expression.type === "const" ? yield* Const(expression) : (() => {
          throw new TemplateLiteralGeneratorError("Unknown expression");
        })();
      }
      TemplateLiteralGenerator2.Generate = Generate;
    })(TemplateLiteralGenerator || (exports.TemplateLiteralGenerator = TemplateLiteralGenerator = {}));
    var TemplateLiteralDslParser;
    (function(TemplateLiteralDslParser2) {
      function* ParseUnion(template) {
        const trim = template.trim().replace(/"|'/g, "");
        return trim === "boolean" ? yield exports.Type.Boolean() : trim === "number" ? yield exports.Type.Number() : trim === "bigint" ? yield exports.Type.BigInt() : trim === "string" ? yield exports.Type.String() : yield (() => {
          const literals = trim.split("|").map((literal) => exports.Type.Literal(literal.trim()));
          return literals.length === 0 ? exports.Type.Never() : literals.length === 1 ? literals[0] : exports.Type.Union(literals);
        })();
      }
      function* ParseTerminal(template) {
        if (template[1] !== "{") {
          const L = exports.Type.Literal("$");
          const R = ParseLiteral(template.slice(1));
          return yield* [L, ...R];
        }
        for (let i = 2; i < template.length; i++) {
          if (template[i] === "}") {
            const L = ParseUnion(template.slice(2, i));
            const R = ParseLiteral(template.slice(i + 1));
            return yield* [...L, ...R];
          }
        }
        yield exports.Type.Literal(template);
      }
      function* ParseLiteral(template) {
        for (let i = 0; i < template.length; i++) {
          if (template[i] === "$") {
            const L = exports.Type.Literal(template.slice(0, i));
            const R = ParseTerminal(template.slice(i));
            return yield* [L, ...R];
          }
        }
        yield exports.Type.Literal(template);
      }
      function Parse(template_dsl) {
        return [...ParseLiteral(template_dsl)];
      }
      TemplateLiteralDslParser2.Parse = Parse;
    })(TemplateLiteralDslParser || (exports.TemplateLiteralDslParser = TemplateLiteralDslParser = {}));
    var TransformDecodeBuilder = class {
      constructor(schema) {
        this.schema = schema;
      }
      Decode(decode) {
        return new TransformEncodeBuilder(this.schema, decode);
      }
    };
    exports.TransformDecodeBuilder = TransformDecodeBuilder;
    var TransformEncodeBuilder = class {
      constructor(schema, decode) {
        this.schema = schema;
        this.decode = decode;
      }
      Encode(encode) {
        const schema = TypeClone.Type(this.schema);
        return TypeGuard.TTransform(schema) ? (() => {
          const Encode = (value) => schema[exports.Transform].Encode(encode(value));
          const Decode = (value) => this.decode(schema[exports.Transform].Decode(value));
          const Codec = { Encode, Decode };
          return { ...schema, [exports.Transform]: Codec };
        })() : (() => {
          const Codec = { Decode: this.decode, Encode: encode };
          return { ...schema, [exports.Transform]: Codec };
        })();
      }
    };
    exports.TransformEncodeBuilder = TransformEncodeBuilder;
    var TypeOrdinal = 0;
    var TypeBuilderError = class extends TypeBoxError {
    };
    exports.TypeBuilderError = TypeBuilderError;
    var TypeBuilder = class {
      /** `[Internal]` Creates a schema without `static` and `params` types */
      Create(schema) {
        return schema;
      }
      /** `[Internal]` Throws a TypeBuilder error with the given message */
      Throw(message) {
        throw new TypeBuilderError(message);
      }
      /** `[Internal]` Discards property keys from the given record type */
      Discard(record, keys) {
        return keys.reduce((acc, key) => {
          const { [key]: _, ...rest } = acc;
          return rest;
        }, record);
      }
      /** `[Json]` Omits compositing symbols from this schema */
      Strict(schema) {
        return JSON.parse(JSON.stringify(schema));
      }
    };
    exports.TypeBuilder = TypeBuilder;
    var JsonTypeBuilder = class extends TypeBuilder {
      // ------------------------------------------------------------------------
      // Modifiers
      // ------------------------------------------------------------------------
      /** `[Json]` Creates a Readonly and Optional property */
      ReadonlyOptional(schema) {
        return this.Readonly(this.Optional(schema));
      }
      /** `[Json]` Creates a Readonly property */
      Readonly(schema) {
        return { ...TypeClone.Type(schema), [exports.Readonly]: "Readonly" };
      }
      /** `[Json]` Creates an Optional property */
      Optional(schema) {
        return { ...TypeClone.Type(schema), [exports.Optional]: "Optional" };
      }
      // ------------------------------------------------------------------------
      // Types
      // ------------------------------------------------------------------------
      /** `[Json]` Creates an Any type */
      Any(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Any" });
      }
      /** `[Json]` Creates an Array type */
      Array(schema, options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Array", type: "array", items: TypeClone.Type(schema) });
      }
      /** `[Json]` Creates a Boolean type */
      Boolean(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Boolean", type: "boolean" });
      }
      /** `[Json]` Intrinsic function to Capitalize LiteralString types */
      Capitalize(schema, options = {}) {
        return { ...Intrinsic.Map(TypeClone.Type(schema), "Capitalize"), ...options };
      }
      /** `[Json]` Creates a Composite object type */
      Composite(objects, options) {
        const intersect = exports.Type.Intersect(objects, {});
        const keys = KeyResolver.ResolveKeys(intersect, { includePatterns: false });
        const properties = keys.reduce((acc, key) => ({ ...acc, [key]: exports.Type.Index(intersect, [key]) }), {});
        return exports.Type.Object(properties, options);
      }
      /** `[Json]` Creates a Enum type */
      Enum(item, options = {}) {
        if (ValueGuard.IsUndefined(item))
          return this.Throw("Enum undefined or empty");
        const values1 = Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
        const values2 = [...new Set(values1)];
        const anyOf = values2.map((value) => exports.Type.Literal(value));
        return this.Union(anyOf, { ...options, [exports.Hint]: "Enum" });
      }
      /** `[Json]` Creates a Conditional type */
      Extends(left, right, trueType, falseType, options = {}) {
        switch (TypeExtends.Extends(left, right)) {
          case TypeExtendsResult.Union:
            return this.Union([TypeClone.Type(trueType, options), TypeClone.Type(falseType, options)]);
          case TypeExtendsResult.True:
            return TypeClone.Type(trueType, options);
          case TypeExtendsResult.False:
            return TypeClone.Type(falseType, options);
        }
      }
      /** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
      Exclude(unionType, excludedMembers, options = {}) {
        return TypeGuard.TTemplateLiteral(unionType) ? this.Exclude(TemplateLiteralResolver.Resolve(unionType), excludedMembers, options) : TypeGuard.TTemplateLiteral(excludedMembers) ? this.Exclude(unionType, TemplateLiteralResolver.Resolve(excludedMembers), options) : TypeGuard.TUnion(unionType) ? (() => {
          const narrowed = unionType.anyOf.filter((inner) => TypeExtends.Extends(inner, excludedMembers) === TypeExtendsResult.False);
          return narrowed.length === 1 ? TypeClone.Type(narrowed[0], options) : this.Union(narrowed, options);
        })() : TypeExtends.Extends(unionType, excludedMembers) !== TypeExtendsResult.False ? this.Never(options) : TypeClone.Type(unionType, options);
      }
      /** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
      Extract(type, union, options = {}) {
        return TypeGuard.TTemplateLiteral(type) ? this.Extract(TemplateLiteralResolver.Resolve(type), union, options) : TypeGuard.TTemplateLiteral(union) ? this.Extract(type, TemplateLiteralResolver.Resolve(union), options) : TypeGuard.TUnion(type) ? (() => {
          const narrowed = type.anyOf.filter((inner) => TypeExtends.Extends(inner, union) !== TypeExtendsResult.False);
          return narrowed.length === 1 ? TypeClone.Type(narrowed[0], options) : this.Union(narrowed, options);
        })() : TypeExtends.Extends(type, union) !== TypeExtendsResult.False ? TypeClone.Type(type, options) : this.Never(options);
      }
      /** `[Json]` Returns an Indexed property type for the given keys */
      Index(schema, unresolved, options = {}) {
        return TypeGuard.TArray(schema) && TypeGuard.TNumber(unresolved) ? (() => {
          return TypeClone.Type(schema.items, options);
        })() : TypeGuard.TTuple(schema) && TypeGuard.TNumber(unresolved) ? (() => {
          const items = ValueGuard.IsUndefined(schema.items) ? [] : schema.items;
          const cloned = items.map((schema2) => TypeClone.Type(schema2));
          return this.Union(cloned, options);
        })() : (() => {
          const keys = KeyArrayResolver.Resolve(unresolved);
          const clone = TypeClone.Type(schema);
          return IndexedAccessor.Resolve(clone, keys, options);
        })();
      }
      /** `[Json]` Creates an Integer type */
      Integer(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Integer", type: "integer" });
      }
      /** `[Json]` Creates an Intersect type */
      Intersect(allOf, options = {}) {
        if (allOf.length === 0)
          return exports.Type.Never();
        if (allOf.length === 1)
          return TypeClone.Type(allOf[0], options);
        if (allOf.some((schema) => TypeGuard.TTransform(schema)))
          this.Throw("Cannot intersect transform types");
        const objects = allOf.every((schema) => TypeGuard.TObject(schema));
        const cloned = TypeClone.Rest(allOf);
        const clonedUnevaluatedProperties = TypeGuard.TSchema(options.unevaluatedProperties) ? { unevaluatedProperties: TypeClone.Type(options.unevaluatedProperties) } : {};
        return options.unevaluatedProperties === false || TypeGuard.TSchema(options.unevaluatedProperties) || objects ? this.Create({ ...options, ...clonedUnevaluatedProperties, [exports.Kind]: "Intersect", type: "object", allOf: cloned }) : this.Create({ ...options, ...clonedUnevaluatedProperties, [exports.Kind]: "Intersect", allOf: cloned });
      }
      /** `[Json]` Creates a KeyOf type */
      KeyOf(schema, options = {}) {
        return TypeGuard.TRecord(schema) ? (() => {
          const pattern2 = Object.getOwnPropertyNames(schema.patternProperties)[0];
          return pattern2 === exports.PatternNumberExact ? this.Number(options) : pattern2 === exports.PatternStringExact ? this.String(options) : this.Throw("Unable to resolve key type from Record key pattern");
        })() : TypeGuard.TTuple(schema) ? (() => {
          const items = ValueGuard.IsUndefined(schema.items) ? [] : schema.items;
          const literals = items.map((_, index) => exports.Type.Literal(index.toString()));
          return this.Union(literals, options);
        })() : TypeGuard.TArray(schema) ? (() => {
          return this.Number(options);
        })() : (() => {
          const keys = KeyResolver.ResolveKeys(schema, { includePatterns: false });
          if (keys.length === 0)
            return this.Never(options);
          const literals = keys.map((key) => this.Literal(key));
          return this.Union(literals, options);
        })();
      }
      /** `[Json]` Creates a Literal type */
      Literal(value, options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Literal", const: value, type: typeof value });
      }
      /** `[Json]` Intrinsic function to Lowercase LiteralString types */
      Lowercase(schema, options = {}) {
        return { ...Intrinsic.Map(TypeClone.Type(schema), "Lowercase"), ...options };
      }
      /** `[Json]` Creates a Never type */
      Never(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Never", not: {} });
      }
      /** `[Json]` Creates a Not type */
      Not(schema, options) {
        return this.Create({ ...options, [exports.Kind]: "Not", not: TypeClone.Type(schema) });
      }
      /** `[Json]` Creates a Null type */
      Null(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Null", type: "null" });
      }
      /** `[Json]` Creates a Number type */
      Number(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Number", type: "number" });
      }
      /** `[Json]` Creates an Object type */
      Object(properties, options = {}) {
        const propertyKeys = Object.getOwnPropertyNames(properties);
        const optionalKeys = propertyKeys.filter((key) => TypeGuard.TOptional(properties[key]));
        const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
        const clonedAdditionalProperties = TypeGuard.TSchema(options.additionalProperties) ? { additionalProperties: TypeClone.Type(options.additionalProperties) } : {};
        const clonedProperties = propertyKeys.reduce((acc, key) => ({ ...acc, [key]: TypeClone.Type(properties[key]) }), {});
        return requiredKeys.length > 0 ? this.Create({ ...options, ...clonedAdditionalProperties, [exports.Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys }) : this.Create({ ...options, ...clonedAdditionalProperties, [exports.Kind]: "Object", type: "object", properties: clonedProperties });
      }
      /** `[Json]` Constructs a type whose keys are omitted from the given type */
      Omit(schema, unresolved, options = {}) {
        const keys = KeyArrayResolver.Resolve(unresolved);
        return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
          if (ValueGuard.IsArray(object.required)) {
            object.required = object.required.filter((key) => !keys.includes(key));
            if (object.required.length === 0)
              delete object.required;
          }
          for (const key of Object.getOwnPropertyNames(object.properties)) {
            if (keys.includes(key))
              delete object.properties[key];
          }
          return this.Create(object);
        }, options);
      }
      /** `[Json]` Constructs a type where all properties are optional */
      Partial(schema, options = {}) {
        return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
          const properties = Object.getOwnPropertyNames(object.properties).reduce((acc, key) => {
            return { ...acc, [key]: this.Optional(object.properties[key]) };
          }, {});
          return this.Object(
            properties,
            this.Discard(object, ["required"])
            /* object used as options to retain other constraints */
          );
        }, options);
      }
      /** `[Json]` Constructs a type whose keys are picked from the given type */
      Pick(schema, unresolved, options = {}) {
        const keys = KeyArrayResolver.Resolve(unresolved);
        return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
          if (ValueGuard.IsArray(object.required)) {
            object.required = object.required.filter((key) => keys.includes(key));
            if (object.required.length === 0)
              delete object.required;
          }
          for (const key of Object.getOwnPropertyNames(object.properties)) {
            if (!keys.includes(key))
              delete object.properties[key];
          }
          return this.Create(object);
        }, options);
      }
      /** `[Json]` Creates a Record type */
      Record(key, schema, options = {}) {
        return TypeGuard.TTemplateLiteral(key) ? (() => {
          const expression = TemplateLiteralParser.ParseExact(key.pattern);
          return TemplateLiteralFinite.Check(expression) ? this.Object([...TemplateLiteralGenerator.Generate(expression)].reduce((acc, key2) => ({ ...acc, [key2]: TypeClone.Type(schema) }), {}), options) : this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [key.pattern]: TypeClone.Type(schema) } });
        })() : TypeGuard.TUnion(key) ? (() => {
          const union = UnionResolver.Resolve(key);
          if (TypeGuard.TUnionLiteral(union)) {
            const properties = union.anyOf.reduce((acc, literal) => ({ ...acc, [literal.const]: TypeClone.Type(schema) }), {});
            return this.Object(properties, { ...options, [exports.Hint]: "Record" });
          } else
            this.Throw("Record key of type union contains non-literal types");
        })() : TypeGuard.TLiteral(key) ? (() => {
          return ValueGuard.IsString(key.const) || ValueGuard.IsNumber(key.const) ? this.Object({ [key.const]: TypeClone.Type(schema) }, options) : this.Throw("Record key of type literal is not of type string or number");
        })() : TypeGuard.TInteger(key) || TypeGuard.TNumber(key) ? (() => {
          return this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [exports.PatternNumberExact]: TypeClone.Type(schema) } });
        })() : TypeGuard.TString(key) ? (() => {
          const pattern2 = ValueGuard.IsUndefined(key.pattern) ? exports.PatternStringExact : key.pattern;
          return this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [pattern2]: TypeClone.Type(schema) } });
        })() : this.Never();
      }
      /** `[Json]` Creates a Recursive type */
      Recursive(callback, options = {}) {
        if (ValueGuard.IsUndefined(options.$id))
          options.$id = `T${TypeOrdinal++}`;
        const thisType = callback({ [exports.Kind]: "This", $ref: `${options.$id}` });
        thisType.$id = options.$id;
        return this.Create({ ...options, [exports.Hint]: "Recursive", ...thisType });
      }
      /** `[Json]` Creates a Ref type. */
      Ref(unresolved, options = {}) {
        if (ValueGuard.IsString(unresolved))
          return this.Create({ ...options, [exports.Kind]: "Ref", $ref: unresolved });
        if (ValueGuard.IsUndefined(unresolved.$id))
          this.Throw("Reference target type must specify an $id");
        return this.Create({ ...options, [exports.Kind]: "Ref", $ref: unresolved.$id });
      }
      /** `[Json]` Constructs a type where all properties are required */
      Required(schema, options = {}) {
        return ObjectMap.Map(this.Discard(TypeClone.Type(schema), ["$id", exports.Transform]), (object) => {
          const properties = Object.getOwnPropertyNames(object.properties).reduce((acc, key) => {
            return { ...acc, [key]: this.Discard(object.properties[key], [exports.Optional]) };
          }, {});
          return this.Object(
            properties,
            object
            /* object used as options to retain other constraints  */
          );
        }, options);
      }
      /** `[Json]` Extracts interior Rest elements from Tuple, Intersect and Union types */
      Rest(schema) {
        return TypeGuard.TTuple(schema) && !ValueGuard.IsUndefined(schema.items) ? TypeClone.Rest(schema.items) : TypeGuard.TIntersect(schema) ? TypeClone.Rest(schema.allOf) : TypeGuard.TUnion(schema) ? TypeClone.Rest(schema.anyOf) : [];
      }
      /** `[Json]` Creates a String type */
      String(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "String", type: "string" });
      }
      /** `[Json]` Creates a TemplateLiteral type */
      TemplateLiteral(unresolved, options = {}) {
        const pattern2 = ValueGuard.IsString(unresolved) ? TemplateLiteralPattern.Create(TemplateLiteralDslParser.Parse(unresolved)) : TemplateLiteralPattern.Create(unresolved);
        return this.Create({ ...options, [exports.Kind]: "TemplateLiteral", type: "string", pattern: pattern2 });
      }
      /** `[Json]` Creates a Transform type */
      Transform(schema) {
        return new TransformDecodeBuilder(schema);
      }
      /** `[Json]` Creates a Tuple type */
      Tuple(items, options = {}) {
        const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
        const clonedItems = TypeClone.Rest(items);
        const schema = items.length > 0 ? { ...options, [exports.Kind]: "Tuple", type: "array", items: clonedItems, additionalItems, minItems, maxItems } : { ...options, [exports.Kind]: "Tuple", type: "array", minItems, maxItems };
        return this.Create(schema);
      }
      /** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
      Uncapitalize(schema, options = {}) {
        return { ...Intrinsic.Map(TypeClone.Type(schema), "Uncapitalize"), ...options };
      }
      /** `[Json]` Creates a Union type */
      Union(union, options = {}) {
        return TypeGuard.TTemplateLiteral(union) ? TemplateLiteralResolver.Resolve(union) : (() => {
          const anyOf = union;
          if (anyOf.length === 0)
            return this.Never(options);
          if (anyOf.length === 1)
            return this.Create(TypeClone.Type(anyOf[0], options));
          const clonedAnyOf = TypeClone.Rest(anyOf);
          return this.Create({ ...options, [exports.Kind]: "Union", anyOf: clonedAnyOf });
        })();
      }
      /** `[Json]` Creates an Unknown type */
      Unknown(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Unknown" });
      }
      /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
      Unsafe(options = {}) {
        return this.Create({ ...options, [exports.Kind]: options[exports.Kind] || "Unsafe" });
      }
      /** `[Json]` Intrinsic function to Uppercase LiteralString types */
      Uppercase(schema, options = {}) {
        return { ...Intrinsic.Map(TypeClone.Type(schema), "Uppercase"), ...options };
      }
    };
    exports.JsonTypeBuilder = JsonTypeBuilder;
    var JavaScriptTypeBuilder = class extends JsonTypeBuilder {
      /** `[JavaScript]` Creates a AsyncIterator type */
      AsyncIterator(items, options = {}) {
        return this.Create({ ...options, [exports.Kind]: "AsyncIterator", type: "AsyncIterator", items: TypeClone.Type(items) });
      }
      /** `[JavaScript]` Constructs a type by recursively unwrapping Promise types */
      Awaited(schema, options = {}) {
        const Unwrap = (rest) => rest.length > 0 ? (() => {
          const [L, ...R] = rest;
          return [this.Awaited(L), ...Unwrap(R)];
        })() : rest;
        return TypeGuard.TIntersect(schema) ? exports.Type.Intersect(Unwrap(schema.allOf)) : TypeGuard.TUnion(schema) ? exports.Type.Union(Unwrap(schema.anyOf)) : TypeGuard.TPromise(schema) ? this.Awaited(schema.item) : TypeClone.Type(schema, options);
      }
      /** `[JavaScript]` Creates a BigInt type */
      BigInt(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "BigInt", type: "bigint" });
      }
      /** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
      ConstructorParameters(schema, options = {}) {
        return this.Tuple([...schema.parameters], { ...options });
      }
      /** `[JavaScript]` Creates a Constructor type */
      Constructor(parameters, returns, options) {
        const [clonedParameters, clonedReturns] = [TypeClone.Rest(parameters), TypeClone.Type(returns)];
        return this.Create({ ...options, [exports.Kind]: "Constructor", type: "Constructor", parameters: clonedParameters, returns: clonedReturns });
      }
      /** `[JavaScript]` Creates a Date type */
      Date(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Date", type: "Date" });
      }
      /** `[JavaScript]` Creates a Function type */
      Function(parameters, returns, options) {
        const [clonedParameters, clonedReturns] = [TypeClone.Rest(parameters), TypeClone.Type(returns)];
        return this.Create({ ...options, [exports.Kind]: "Function", type: "Function", parameters: clonedParameters, returns: clonedReturns });
      }
      /** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
      InstanceType(schema, options = {}) {
        return TypeClone.Type(schema.returns, options);
      }
      /** `[JavaScript]` Creates an Iterator type */
      Iterator(items, options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Iterator", type: "Iterator", items: TypeClone.Type(items) });
      }
      /** `[JavaScript]` Extracts the Parameters from the given Function type */
      Parameters(schema, options = {}) {
        return this.Tuple(schema.parameters, { ...options });
      }
      /** `[JavaScript]` Creates a Promise type */
      Promise(item, options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Promise", type: "Promise", item: TypeClone.Type(item) });
      }
      /** `[Extended]` Creates a String type */
      RegExp(unresolved, options = {}) {
        const pattern2 = ValueGuard.IsString(unresolved) ? unresolved : unresolved.source;
        return this.Create({ ...options, [exports.Kind]: "String", type: "string", pattern: pattern2 });
      }
      /**
       * @deprecated Use `Type.RegExp`
       */
      RegEx(regex, options = {}) {
        return this.RegExp(regex, options);
      }
      /** `[JavaScript]` Extracts the ReturnType from the given Function type */
      ReturnType(schema, options = {}) {
        return TypeClone.Type(schema.returns, options);
      }
      /** `[JavaScript]` Creates a Symbol type */
      Symbol(options) {
        return this.Create({ ...options, [exports.Kind]: "Symbol", type: "symbol" });
      }
      /** `[JavaScript]` Creates a Undefined type */
      Undefined(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Undefined", type: "undefined" });
      }
      /** `[JavaScript]` Creates a Uint8Array type */
      Uint8Array(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Uint8Array", type: "Uint8Array" });
      }
      /** `[JavaScript]` Creates a Void type */
      Void(options = {}) {
        return this.Create({ ...options, [exports.Kind]: "Void", type: "void" });
      }
    };
    exports.JavaScriptTypeBuilder = JavaScriptTypeBuilder;
    exports.JsonType = new JsonTypeBuilder();
    exports.Type = new JavaScriptTypeBuilder();
  }
});

// node_modules/.pnpm/parsimmon@1.18.1_patch_hash=vtken27tsen5dzmqdyowlvqcce/node_modules/parsimmon/src/parsimmon.js
var require_parsimmon = __commonJS({
  "node_modules/.pnpm/parsimmon@1.18.1_patch_hash=vtken27tsen5dzmqdyowlvqcce/node_modules/parsimmon/src/parsimmon.js"(exports, module) {
    "use strict";
    function Parsimmon2(action) {
      if (!(this instanceof Parsimmon2)) {
        return new Parsimmon2(action);
      }
      this._ = action;
    }
    var _ = Parsimmon2.prototype;
    function times(n, f) {
      var i = 0;
      for (i; i < n; i++) {
        f(i);
      }
    }
    function forEach(f, arr) {
      times(arr.length, function(i) {
        f(arr[i], i, arr);
      });
    }
    function reduce(f, seed, arr) {
      forEach(function(elem, i, arr2) {
        seed = f(seed, elem, i, arr2);
      }, arr);
      return seed;
    }
    function map(f, arr) {
      return reduce(
        function(acc, elem, i, a) {
          return acc.concat([f(elem, i, a)]);
        },
        [],
        arr
      );
    }
    function lshiftBuffer(input) {
      var asTwoBytes = reduce(
        function(a, v, i, b) {
          return a.concat(
            i === b.length - 1 ? Buffer.from([v, 0]).readUInt16BE(0) : b.readUInt16BE(i)
          );
        },
        [],
        input
      );
      return Buffer.from(
        map(function(x) {
          return (x << 1 & 65535) >> 8;
        }, asTwoBytes)
      );
    }
    function consumeBitsFromBuffer(n, input) {
      var state = { v: 0, buf: input };
      times(n, function() {
        state = {
          v: state.v << 1 | bitPeekBuffer(state.buf),
          buf: lshiftBuffer(state.buf)
        };
      });
      return state;
    }
    function bitPeekBuffer(input) {
      return input[0] >> 7;
    }
    function sum(numArr) {
      return reduce(
        function(x, y) {
          return x + y;
        },
        0,
        numArr
      );
    }
    function find(pred, arr) {
      return reduce(
        function(found, elem) {
          return found || (pred(elem) ? elem : found);
        },
        null,
        arr
      );
    }
    function bufferExists() {
      return typeof Buffer !== "undefined";
    }
    function setExists() {
      if (Parsimmon2._supportsSet !== void 0) {
        return Parsimmon2._supportsSet;
      }
      var exists = typeof Set !== "undefined";
      Parsimmon2._supportsSet = exists;
      return exists;
    }
    function ensureBuffer() {
      if (!bufferExists()) {
        throw new Error(
          "Buffer global does not exist; please use webpack if you need to parse Buffers in the browser."
        );
      }
    }
    function bitSeq(alignments) {
      ensureBuffer();
      var totalBits = sum(alignments);
      if (totalBits % 8 !== 0) {
        throw new Error(
          "The bits [" + alignments.join(", ") + "] add up to " + totalBits + " which is not an even number of bytes; the total should be divisible by 8"
        );
      }
      var bytes = totalBits / 8;
      var tooBigRange = find(function(x) {
        return x > 48;
      }, alignments);
      if (tooBigRange) {
        throw new Error(
          tooBigRange + " bit range requested exceeds 48 bit (6 byte) Number max."
        );
      }
      return new Parsimmon2(function(input, i) {
        var newPos = bytes + i;
        if (newPos > input.length) {
          return makeFailure(i, bytes.toString() + " bytes");
        }
        return makeSuccess(
          newPos,
          reduce(
            function(acc, bits) {
              var state = consumeBitsFromBuffer(bits, acc.buf);
              return {
                coll: acc.coll.concat(state.v),
                buf: state.buf
              };
            },
            { coll: [], buf: input.slice(i, newPos) },
            alignments
          ).coll
        );
      });
    }
    function bitSeqObj(namedAlignments) {
      ensureBuffer();
      var seenKeys = {};
      var totalKeys = 0;
      var fullAlignments = map(function(item) {
        if (isArray(item)) {
          var pair = item;
          if (pair.length !== 2) {
            throw new Error(
              "[" + pair.join(", ") + "] should be length 2, got length " + pair.length
            );
          }
          assertString(pair[0]);
          assertNumber(pair[1]);
          if (Object.prototype.hasOwnProperty.call(seenKeys, pair[0])) {
            throw new Error("duplicate key in bitSeqObj: " + pair[0]);
          }
          seenKeys[pair[0]] = true;
          totalKeys++;
          return pair;
        } else {
          assertNumber(item);
          return [null, item];
        }
      }, namedAlignments);
      if (totalKeys < 1) {
        throw new Error(
          "bitSeqObj expects at least one named pair, got [" + namedAlignments.join(", ") + "]"
        );
      }
      var namesOnly = map(function(pair) {
        return pair[0];
      }, fullAlignments);
      var alignmentsOnly = map(function(pair) {
        return pair[1];
      }, fullAlignments);
      return bitSeq(alignmentsOnly).map(function(parsed) {
        var namedParsed = map(function(name, i) {
          return [name, parsed[i]];
        }, namesOnly);
        return reduce(
          function(obj, kv) {
            if (kv[0] !== null) {
              obj[kv[0]] = kv[1];
            }
            return obj;
          },
          {},
          namedParsed
        );
      });
    }
    function parseBufferFor(other, length) {
      return new Parsimmon2(function(input, i) {
        ensureBuffer();
        if (i + length > input.length) {
          return makeFailure(i, length + " bytes for " + other);
        }
        return makeSuccess(i + length, input.slice(i, i + length));
      });
    }
    function parseBuffer(length) {
      return parseBufferFor("buffer", length).map(function(unsafe) {
        return Buffer.from(unsafe);
      });
    }
    function encodedString(encoding, length) {
      return parseBufferFor("string", length).map(function(buff) {
        return buff.toString(encoding);
      });
    }
    function isInteger(value) {
      return typeof value === "number" && Math.floor(value) === value;
    }
    function assertValidIntegerByteLengthFor(who, length) {
      if (!isInteger(length) || length < 0 || length > 6) {
        throw new Error(who + " requires integer length in range [0, 6].");
      }
    }
    function uintBE(length) {
      assertValidIntegerByteLengthFor("uintBE", length);
      return parseBufferFor("uintBE(" + length + ")", length).map(function(buff) {
        return buff.readUIntBE(0, length);
      });
    }
    function uintLE(length) {
      assertValidIntegerByteLengthFor("uintLE", length);
      return parseBufferFor("uintLE(" + length + ")", length).map(function(buff) {
        return buff.readUIntLE(0, length);
      });
    }
    function intBE(length) {
      assertValidIntegerByteLengthFor("intBE", length);
      return parseBufferFor("intBE(" + length + ")", length).map(function(buff) {
        return buff.readIntBE(0, length);
      });
    }
    function intLE(length) {
      assertValidIntegerByteLengthFor("intLE", length);
      return parseBufferFor("intLE(" + length + ")", length).map(function(buff) {
        return buff.readIntLE(0, length);
      });
    }
    function floatBE() {
      return parseBufferFor("floatBE", 4).map(function(buff) {
        return buff.readFloatBE(0);
      });
    }
    function floatLE() {
      return parseBufferFor("floatLE", 4).map(function(buff) {
        return buff.readFloatLE(0);
      });
    }
    function doubleBE() {
      return parseBufferFor("doubleBE", 8).map(function(buff) {
        return buff.readDoubleBE(0);
      });
    }
    function doubleLE() {
      return parseBufferFor("doubleLE", 8).map(function(buff) {
        return buff.readDoubleLE(0);
      });
    }
    function toArray(arrLike) {
      return Array.prototype.slice.call(arrLike);
    }
    function isParser(obj) {
      return obj instanceof Parsimmon2;
    }
    function isArray(x) {
      return {}.toString.call(x) === "[object Array]";
    }
    function isBuffer(x) {
      return bufferExists() && Buffer.isBuffer(x);
    }
    function makeSuccess(index2, value) {
      return {
        status: true,
        index: index2,
        value,
        furthest: -1,
        expected: []
      };
    }
    function makeFailure(index2, expected) {
      if (!isArray(expected)) {
        expected = [expected];
      }
      return {
        status: false,
        index: -1,
        value: null,
        furthest: index2,
        expected
      };
    }
    function mergeReplies(result, last) {
      if (!last) {
        return result;
      }
      if (result.furthest > last.furthest) {
        return result;
      }
      var expected = result.furthest === last.furthest ? union(result.expected, last.expected) : last.expected;
      return {
        status: result.status,
        index: result.index,
        value: result.value,
        furthest: last.furthest,
        expected
      };
    }
    var lineColumnIndex = {};
    function makeLineColumnIndex(input, i) {
      if (isBuffer(input)) {
        return {
          offset: i,
          line: -1,
          column: -1
        };
      }
      if (!(input in lineColumnIndex)) {
        lineColumnIndex[input] = {};
      }
      var inputIndex = lineColumnIndex[input];
      var prevLine = 0;
      var newLines = 0;
      var lineStart = 0;
      var j = i;
      while (j >= 0) {
        if (j in inputIndex) {
          prevLine = inputIndex[j].line;
          if (lineStart === 0) {
            lineStart = inputIndex[j].lineStart;
          }
          break;
        }
        if (
          // Unix LF (\n) or Windows CRLF (\r\n) line ending
          input.charAt(j) === "\n" || // Old Mac CR (\r) line ending
          input.charAt(j) === "\r" && input.charAt(j + 1) !== "\n"
        ) {
          newLines++;
          if (lineStart === 0) {
            lineStart = j + 1;
          }
        }
        j--;
      }
      var lineWeAreUpTo = prevLine + newLines;
      var columnWeAreUpTo = i - lineStart;
      inputIndex[i] = { line: lineWeAreUpTo, lineStart };
      return {
        offset: i,
        line: lineWeAreUpTo + 1,
        column: columnWeAreUpTo + 1
      };
    }
    function union(xs, ys) {
      if (setExists() && Array.from) {
        var set = new Set(xs);
        for (var y = 0; y < ys.length; y++) {
          set.add(ys[y]);
        }
        var arr = Array.from(set);
        arr.sort();
        return arr;
      }
      var obj = {};
      for (var i = 0; i < xs.length; i++) {
        obj[xs[i]] = true;
      }
      for (var j = 0; j < ys.length; j++) {
        obj[ys[j]] = true;
      }
      var keys = [];
      for (var k in obj) {
        if ({}.hasOwnProperty.call(obj, k)) {
          keys.push(k);
        }
      }
      keys.sort();
      return keys;
    }
    function assertParser(p) {
      if (!isParser(p)) {
        throw new Error("not a parser: " + p);
      }
    }
    function get(input, i) {
      if (typeof input === "string") {
        return input.charAt(i);
      }
      return input[i];
    }
    function assertArray(x) {
      if (!isArray(x)) {
        throw new Error("not an array: " + x);
      }
    }
    function assertNumber(x) {
      if (typeof x !== "number") {
        throw new Error("not a number: " + x);
      }
    }
    function assertRegexp(x) {
      if (!(x instanceof RegExp)) {
        throw new Error("not a regexp: " + x);
      }
      var f = flags(x);
      for (var i = 0; i < f.length; i++) {
        var c = f.charAt(i);
        if (c !== "i" && c !== "m" && c !== "u" && c !== "s") {
          throw new Error('unsupported regexp flag "' + c + '": ' + x);
        }
      }
    }
    function assertFunction(x) {
      if (typeof x !== "function") {
        throw new Error("not a function: " + x);
      }
    }
    function assertString(x) {
      if (typeof x !== "string") {
        throw new Error("not a string: " + x);
      }
    }
    var linesBeforeStringError = 2;
    var linesAfterStringError = 3;
    var bytesPerLine = 8;
    var bytesBefore = bytesPerLine * 5;
    var bytesAfter = bytesPerLine * 4;
    var defaultLinePrefix = "  ";
    function repeat(string2, amount) {
      return new Array(amount + 1).join(string2);
    }
    function formatExpected(expected) {
      if (expected.length === 1) {
        return "Expected:\n\n" + expected[0];
      }
      return "Expected one of the following: \n\n" + expected.join(", ");
    }
    function leftPad(str, pad, char) {
      var add = pad - str.length;
      if (add <= 0) {
        return str;
      }
      return repeat(char, add) + str;
    }
    function toChunks(arr, chunkSize) {
      var length = arr.length;
      var chunks = [];
      var chunkIndex = 0;
      if (length <= chunkSize) {
        return [arr.slice()];
      }
      for (var i = 0; i < length; i++) {
        if (!chunks[chunkIndex]) {
          chunks.push([]);
        }
        chunks[chunkIndex].push(arr[i]);
        if ((i + 1) % chunkSize === 0) {
          chunkIndex++;
        }
      }
      return chunks;
    }
    function rangeFromIndexAndOffsets(i, before, after, length) {
      return {
        // Guard against the negative upper bound for lines included in the output.
        from: i - before > 0 ? i - before : 0,
        to: i + after > length ? length : i + after
      };
    }
    function byteRangeToRange(byteRange) {
      if (byteRange.from === 0 && byteRange.to === 1) {
        return {
          from: byteRange.from,
          to: byteRange.to
        };
      }
      return {
        from: byteRange.from / bytesPerLine,
        // Round `to`, so we don't get float if the amount of bytes is not divisible by `bytesPerLine`
        to: Math.floor(byteRange.to / bytesPerLine)
      };
    }
    function formatGot(input, error) {
      var index2 = error.index;
      var i = index2.offset;
      var verticalMarkerLength = 1;
      var column;
      var lineWithErrorIndex;
      var lines;
      var lineRange;
      var lastLineNumberLabelLength;
      if (i === input.length) {
        return "Got the end of the input";
      }
      if (isBuffer(input)) {
        var byteLineWithErrorIndex = i - i % bytesPerLine;
        var columnByteIndex = i - byteLineWithErrorIndex;
        var byteRange = rangeFromIndexAndOffsets(
          byteLineWithErrorIndex,
          bytesBefore,
          bytesAfter + bytesPerLine,
          input.length
        );
        var bytes = input.slice(byteRange.from, byteRange.to);
        var bytesInChunks = toChunks(bytes.toJSON().data, bytesPerLine);
        var byteLines = map(function(byteRow) {
          return map(function(byteValue) {
            return leftPad(byteValue.toString(16), 2, "0");
          }, byteRow);
        }, bytesInChunks);
        lineRange = byteRangeToRange(byteRange);
        lineWithErrorIndex = byteLineWithErrorIndex / bytesPerLine;
        column = columnByteIndex * 3;
        if (columnByteIndex >= 4) {
          column += 1;
        }
        verticalMarkerLength = 2;
        lines = map(function(byteLine) {
          return byteLine.length <= 4 ? byteLine.join(" ") : byteLine.slice(0, 4).join(" ") + "  " + byteLine.slice(4).join(" ");
        }, byteLines);
        lastLineNumberLabelLength = ((lineRange.to > 0 ? lineRange.to - 1 : lineRange.to) * 8).toString(16).length;
        if (lastLineNumberLabelLength < 2) {
          lastLineNumberLabelLength = 2;
        }
      } else {
        var inputLines = input.split(/\r\n|[\n\r\u2028\u2029]/);
        column = index2.column - 1;
        lineWithErrorIndex = index2.line - 1;
        lineRange = rangeFromIndexAndOffsets(
          lineWithErrorIndex,
          linesBeforeStringError,
          linesAfterStringError,
          inputLines.length
        );
        lines = inputLines.slice(lineRange.from, lineRange.to);
        lastLineNumberLabelLength = lineRange.to.toString().length;
      }
      var lineWithErrorCurrentIndex = lineWithErrorIndex - lineRange.from;
      if (isBuffer(input)) {
        lastLineNumberLabelLength = ((lineRange.to > 0 ? lineRange.to - 1 : lineRange.to) * 8).toString(16).length;
        if (lastLineNumberLabelLength < 2) {
          lastLineNumberLabelLength = 2;
        }
      }
      var linesWithLineNumbers = reduce(
        function(acc, lineSource, index3) {
          var isLineWithError = index3 === lineWithErrorCurrentIndex;
          var prefix = isLineWithError ? "> " : defaultLinePrefix;
          var lineNumberLabel;
          if (isBuffer(input)) {
            lineNumberLabel = leftPad(
              ((lineRange.from + index3) * 8).toString(16),
              lastLineNumberLabelLength,
              "0"
            );
          } else {
            lineNumberLabel = leftPad(
              (lineRange.from + index3 + 1).toString(),
              lastLineNumberLabelLength,
              " "
            );
          }
          return [].concat(
            acc,
            [prefix + lineNumberLabel + " | " + lineSource],
            isLineWithError ? [
              defaultLinePrefix + repeat(" ", lastLineNumberLabelLength) + " | " + leftPad("", column, " ") + repeat("^", verticalMarkerLength)
            ] : []
          );
        },
        [],
        lines
      );
      return linesWithLineNumbers.join("\n");
    }
    function formatError(input, error) {
      return [
        "\n",
        "-- PARSING FAILED " + repeat("-", 50),
        "\n\n",
        formatGot(input, error),
        "\n\n",
        formatExpected(error.expected),
        "\n"
      ].join("");
    }
    function flags(re) {
      if (re.flags !== void 0) {
        return re.flags;
      }
      return [
        re.global ? "g" : "",
        re.ignoreCase ? "i" : "",
        re.multiline ? "m" : "",
        re.unicode ? "u" : "",
        re.sticky ? "y" : ""
      ].join("");
    }
    function anchoredRegexp(re) {
      return RegExp("^(?:" + re.source + ")", flags(re));
    }
    function seq() {
      var parsers = [].slice.call(arguments);
      var numParsers = parsers.length;
      for (var j = 0; j < numParsers; j += 1) {
        assertParser(parsers[j]);
      }
      return Parsimmon2(function(input, i) {
        var result;
        var accum = new Array(numParsers);
        for (var j2 = 0; j2 < numParsers; j2 += 1) {
          result = mergeReplies(parsers[j2]._(input, i), result);
          if (!result.status) {
            return result;
          }
          accum[j2] = result.value;
          i = result.index;
        }
        return mergeReplies(makeSuccess(i, accum), result);
      });
    }
    function seqObj() {
      var seenKeys = {};
      var totalKeys = 0;
      var parsers = toArray(arguments);
      var numParsers = parsers.length;
      for (var j = 0; j < numParsers; j += 1) {
        var p = parsers[j];
        if (isParser(p)) {
          continue;
        }
        if (isArray(p)) {
          var isWellFormed = p.length === 2 && typeof p[0] === "string" && isParser(p[1]);
          if (isWellFormed) {
            var key = p[0];
            if (Object.prototype.hasOwnProperty.call(seenKeys, key)) {
              throw new Error("seqObj: duplicate key " + key);
            }
            seenKeys[key] = true;
            totalKeys++;
            continue;
          }
        }
        throw new Error(
          "seqObj arguments must be parsers or [string, parser] array pairs."
        );
      }
      if (totalKeys === 0) {
        throw new Error("seqObj expects at least one named parser, found zero");
      }
      return Parsimmon2(function(input, i) {
        var result;
        var accum = {};
        for (var j2 = 0; j2 < numParsers; j2 += 1) {
          var name;
          var parser;
          if (isArray(parsers[j2])) {
            name = parsers[j2][0];
            parser = parsers[j2][1];
          } else {
            name = null;
            parser = parsers[j2];
          }
          result = mergeReplies(parser._(input, i), result);
          if (!result.status) {
            return result;
          }
          if (name) {
            accum[name] = result.value;
          }
          i = result.index;
        }
        return mergeReplies(makeSuccess(i, accum), result);
      });
    }
    function seqMap() {
      var args = [].slice.call(arguments);
      if (args.length === 0) {
        throw new Error("seqMap needs at least one argument");
      }
      var mapper = args.pop();
      assertFunction(mapper);
      return seq.apply(null, args).map(function(results) {
        return mapper.apply(null, results);
      });
    }
    function createLanguage(parsers) {
      var language = {};
      for (var key in parsers) {
        if ({}.hasOwnProperty.call(parsers, key)) {
          (function(key2) {
            var func = function() {
              return parsers[key2](language);
            };
            language[key2] = lazy(func);
          })(key);
        }
      }
      return language;
    }
    function alt() {
      var parsers = [].slice.call(arguments);
      var numParsers = parsers.length;
      if (numParsers === 0) {
        return fail("zero alternates");
      }
      for (var j = 0; j < numParsers; j += 1) {
        assertParser(parsers[j]);
      }
      return Parsimmon2(function(input, i) {
        var result;
        for (var j2 = 0; j2 < parsers.length; j2 += 1) {
          result = mergeReplies(parsers[j2]._(input, i), result);
          if (result.status) {
            return result;
          }
        }
        return result;
      });
    }
    function sepBy(parser, separator) {
      return sepBy1(parser, separator).or(succeed([]));
    }
    function sepBy1(parser, separator) {
      assertParser(parser);
      assertParser(separator);
      var pairs = separator.then(parser).many();
      return seqMap(parser, pairs, function(r, rs) {
        return [r].concat(rs);
      });
    }
    _.parse = function(input) {
      if (typeof input !== "string" && !isBuffer(input)) {
        throw new Error(
          ".parse must be called with a string or Buffer as its argument"
        );
      }
      var parseResult = this.skip(eof)._(input, 0);
      var result;
      if (parseResult.status) {
        result = {
          status: true,
          value: parseResult.value
        };
      } else {
        result = {
          status: false,
          index: makeLineColumnIndex(input, parseResult.furthest),
          expected: parseResult.expected
        };
      }
      delete lineColumnIndex[input];
      return result;
    };
    _.tryParse = function(str) {
      var result = this.parse(str);
      if (result.status) {
        return result.value;
      } else {
        var msg = formatError(str, result);
        var err = new Error(msg);
        err.type = "ParsimmonError";
        err.result = result;
        throw err;
      }
    };
    _.assert = function(condition, errorMessage) {
      return this.chain(function(value) {
        return condition(value) ? succeed(value) : fail(errorMessage);
      });
    };
    _.or = function(alternative) {
      return alt(this, alternative);
    };
    _.trim = function(parser) {
      return this.wrap(parser, parser);
    };
    _.wrap = function(leftParser, rightParser) {
      return seqMap(leftParser, this, rightParser, function(left, middle) {
        return middle;
      });
    };
    _.thru = function(wrapper) {
      return wrapper(this);
    };
    _.then = function(next) {
      assertParser(next);
      return seq(this, next).map(function(results) {
        return results[1];
      });
    };
    _.many = function() {
      var self = this;
      return Parsimmon2(function(input, i) {
        var accum = [];
        var result = void 0;
        for (; ; ) {
          result = mergeReplies(self._(input, i), result);
          if (result.status) {
            if (i === result.index) {
              throw new Error(
                "infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause"
              );
            }
            i = result.index;
            accum.push(result.value);
          } else {
            return mergeReplies(makeSuccess(i, accum), result);
          }
        }
      });
    };
    _.tieWith = function(separator) {
      assertString(separator);
      return this.map(function(args) {
        assertArray(args);
        if (args.length) {
          assertString(args[0]);
          var s = args[0];
          for (var i = 1; i < args.length; i++) {
            assertString(args[i]);
            s += separator + args[i];
          }
          return s;
        } else {
          return "";
        }
      });
    };
    _.tie = function() {
      return this.tieWith("");
    };
    _.times = function(min, max) {
      var self = this;
      if (arguments.length < 2) {
        max = min;
      }
      assertNumber(min);
      assertNumber(max);
      return Parsimmon2(function(input, i) {
        var accum = [];
        var result = void 0;
        var prevResult = void 0;
        for (var times2 = 0; times2 < min; times2 += 1) {
          result = self._(input, i);
          prevResult = mergeReplies(result, prevResult);
          if (result.status) {
            i = result.index;
            accum.push(result.value);
          } else {
            return prevResult;
          }
        }
        for (; times2 < max; times2 += 1) {
          result = self._(input, i);
          prevResult = mergeReplies(result, prevResult);
          if (result.status) {
            i = result.index;
            accum.push(result.value);
          } else {
            break;
          }
        }
        return mergeReplies(makeSuccess(i, accum), prevResult);
      });
    };
    _.result = function(res) {
      return this.map(function() {
        return res;
      });
    };
    _.atMost = function(n) {
      return this.times(0, n);
    };
    _.atLeast = function(n) {
      return seqMap(this.times(n), this.many(), function(init, rest) {
        return init.concat(rest);
      });
    };
    _.map = function(fn) {
      assertFunction(fn);
      var self = this;
      return Parsimmon2(function(input, i) {
        var result = self._(input, i);
        if (!result.status) {
          return result;
        }
        return mergeReplies(makeSuccess(result.index, fn(result.value)), result);
      });
    };
    _.contramap = function(fn) {
      assertFunction(fn);
      var self = this;
      return Parsimmon2(function(input, i) {
        var result = self.parse(fn(input.slice(i)));
        if (!result.status) {
          return result;
        }
        return makeSuccess(i + input.length, result.value);
      });
    };
    _.promap = function(f, g) {
      assertFunction(f);
      assertFunction(g);
      return this.contramap(f).map(g);
    };
    _.skip = function(next) {
      return seq(this, next).map(function(results) {
        return results[0];
      });
    };
    _.mark = function() {
      return seqMap(index, this, index, function(start, value, end2) {
        return {
          start,
          value,
          end: end2
        };
      });
    };
    _.node = function(name) {
      return seqMap(index, this, index, function(start, value, end2) {
        return {
          name,
          value,
          start,
          end: end2
        };
      });
    };
    _.sepBy = function(separator) {
      return sepBy(this, separator);
    };
    _.sepBy1 = function(separator) {
      return sepBy1(this, separator);
    };
    _.lookahead = function(x) {
      return this.skip(lookahead(x));
    };
    _.notFollowedBy = function(x) {
      return this.skip(notFollowedBy(x));
    };
    _.desc = function(expected) {
      if (!isArray(expected)) {
        expected = [expected];
      }
      var self = this;
      return Parsimmon2(function(input, i) {
        var reply = self._(input, i);
        if (!reply.status) {
          reply.expected = expected;
        }
        return reply;
      });
    };
    _.fallback = function(result) {
      return this.or(succeed(result));
    };
    _.ap = function(other) {
      return seqMap(other, this, function(f, x) {
        return f(x);
      });
    };
    _.chain = function(f) {
      var self = this;
      return Parsimmon2(function(input, i) {
        var result = self._(input, i);
        if (!result.status) {
          return result;
        }
        var nextParser = f(result.value);
        return mergeReplies(nextParser._(input, result.index), result);
      });
    };
    function string(str) {
      assertString(str);
      var expected = "'" + str + "'";
      return Parsimmon2(function(input, i) {
        var j = i + str.length;
        var head = input.slice(i, j);
        if (head === str) {
          return makeSuccess(j, head);
        } else {
          return makeFailure(i, expected);
        }
      });
    }
    function byte(b) {
      ensureBuffer();
      assertNumber(b);
      if (b > 255) {
        throw new Error(
          "Value specified to byte constructor (" + b + "=0x" + b.toString(16) + ") is larger in value than a single byte."
        );
      }
      var expected = (b > 15 ? "0x" : "0x0") + b.toString(16);
      return Parsimmon2(function(input, i) {
        var head = get(input, i);
        if (head === b) {
          return makeSuccess(i + 1, head);
        } else {
          return makeFailure(i, expected);
        }
      });
    }
    function regexp(re, group) {
      assertRegexp(re);
      if (arguments.length >= 2) {
        assertNumber(group);
      } else {
        group = 0;
      }
      var anchored = anchoredRegexp(re);
      var expected = "" + re;
      return Parsimmon2(function(input, i) {
        var match = anchored.exec(input.slice(i));
        if (match) {
          if (0 <= group && group <= match.length) {
            var fullMatch = match[0];
            var groupMatch = match[group];
            return makeSuccess(i + fullMatch.length, groupMatch);
          }
          var message = "valid match group (0 to " + match.length + ") in " + expected;
          return makeFailure(i, message);
        }
        return makeFailure(i, expected);
      });
    }
    function succeed(value) {
      return Parsimmon2(function(input, i) {
        return makeSuccess(i, value);
      });
    }
    function fail(expected) {
      return Parsimmon2(function(input, i) {
        return makeFailure(i, expected);
      });
    }
    function lookahead(x) {
      if (isParser(x)) {
        return Parsimmon2(function(input, i) {
          var result = x._(input, i);
          result.index = i;
          result.value = "";
          return result;
        });
      } else if (typeof x === "string") {
        return lookahead(string(x));
      } else if (x instanceof RegExp) {
        return lookahead(regexp(x));
      }
      throw new Error("not a string, regexp, or parser: " + x);
    }
    function notFollowedBy(parser) {
      assertParser(parser);
      return Parsimmon2(function(input, i) {
        var result = parser._(input, i);
        var text = input.slice(i, result.index);
        return result.status ? makeFailure(i, 'not "' + text + '"') : makeSuccess(i, null);
      });
    }
    function test(predicate) {
      assertFunction(predicate);
      return Parsimmon2(function(input, i) {
        var char = get(input, i);
        if (i < input.length && predicate(char)) {
          return makeSuccess(i + 1, char);
        } else {
          return makeFailure(i, "a character/byte matching " + predicate);
        }
      });
    }
    function oneOf(str) {
      var expected = str.split("");
      for (var idx = 0; idx < expected.length; idx++) {
        expected[idx] = "'" + expected[idx] + "'";
      }
      return test(function(ch) {
        return str.indexOf(ch) >= 0;
      }).desc(expected);
    }
    function noneOf(str) {
      return test(function(ch) {
        return str.indexOf(ch) < 0;
      }).desc("none of '" + str + "'");
    }
    function custom(parsingFunction) {
      return Parsimmon2(parsingFunction(makeSuccess, makeFailure));
    }
    function range(begin, end2) {
      return test(function(ch) {
        return begin <= ch && ch <= end2;
      }).desc(begin + "-" + end2);
    }
    function takeWhile(predicate) {
      assertFunction(predicate);
      return Parsimmon2(function(input, i) {
        var j = i;
        while (j < input.length && predicate(get(input, j))) {
          j++;
        }
        return makeSuccess(j, input.slice(i, j));
      });
    }
    function lazy(desc, f) {
      if (arguments.length < 2) {
        f = desc;
        desc = void 0;
      }
      var parser = Parsimmon2(function(input, i) {
        parser._ = f()._;
        return parser._(input, i);
      });
      if (desc) {
        return parser.desc(desc);
      } else {
        return parser;
      }
    }
    function empty() {
      return fail("fantasy-land/empty");
    }
    _.concat = _.or;
    _.empty = empty;
    _.of = succeed;
    _["fantasy-land/ap"] = _.ap;
    _["fantasy-land/chain"] = _.chain;
    _["fantasy-land/concat"] = _.concat;
    _["fantasy-land/empty"] = _.empty;
    _["fantasy-land/of"] = _.of;
    _["fantasy-land/map"] = _.map;
    var index = Parsimmon2(function(input, i) {
      return makeSuccess(i, makeLineColumnIndex(input, i));
    });
    var any = Parsimmon2(function(input, i) {
      if (i >= input.length) {
        return makeFailure(i, "any character/byte");
      }
      return makeSuccess(i + 1, get(input, i));
    });
    var all = Parsimmon2(function(input, i) {
      return makeSuccess(input.length, input.slice(i));
    });
    var eof = Parsimmon2(function(input, i) {
      if (i < input.length) {
        return makeFailure(i, "EOF");
      }
      return makeSuccess(i, null);
    });
    var digit = regexp(/[0-9]/).desc("a digit");
    var digits = regexp(/[0-9]*/).desc("optional digits");
    var letter = regexp(/[a-z]/i).desc("a letter");
    var letters = regexp(/[a-z]*/i).desc("optional letters");
    var optWhitespace = regexp(/\s*/).desc("optional whitespace");
    var whitespace = regexp(/\s+/).desc("whitespace");
    var cr = string("\r");
    var lf = string("\n");
    var crlf = string("\r\n");
    var newline = alt(crlf, lf, cr).desc("newline");
    var end = alt(newline, eof);
    Parsimmon2.all = all;
    Parsimmon2.alt = alt;
    Parsimmon2.any = any;
    Parsimmon2.cr = cr;
    Parsimmon2.createLanguage = createLanguage;
    Parsimmon2.crlf = crlf;
    Parsimmon2.custom = custom;
    Parsimmon2.digit = digit;
    Parsimmon2.digits = digits;
    Parsimmon2.empty = empty;
    Parsimmon2.end = end;
    Parsimmon2.eof = eof;
    Parsimmon2.fail = fail;
    Parsimmon2.formatError = formatError;
    Parsimmon2.index = index;
    Parsimmon2.isParser = isParser;
    Parsimmon2.lazy = lazy;
    Parsimmon2.letter = letter;
    Parsimmon2.letters = letters;
    Parsimmon2.lf = lf;
    Parsimmon2.lookahead = lookahead;
    Parsimmon2.makeFailure = makeFailure;
    Parsimmon2.makeSuccess = makeSuccess;
    Parsimmon2.newline = newline;
    Parsimmon2.noneOf = noneOf;
    Parsimmon2.notFollowedBy = notFollowedBy;
    Parsimmon2.of = succeed;
    Parsimmon2.oneOf = oneOf;
    Parsimmon2.optWhitespace = optWhitespace;
    Parsimmon2.Parser = Parsimmon2;
    Parsimmon2.range = range;
    Parsimmon2.regex = regexp;
    Parsimmon2.regexp = regexp;
    Parsimmon2.sepBy = sepBy;
    Parsimmon2.sepBy1 = sepBy1;
    Parsimmon2.seq = seq;
    Parsimmon2.seqMap = seqMap;
    Parsimmon2.seqObj = seqObj;
    Parsimmon2.string = string;
    Parsimmon2.succeed = succeed;
    Parsimmon2.takeWhile = takeWhile;
    Parsimmon2.test = test;
    Parsimmon2.whitespace = whitespace;
    Parsimmon2["fantasy-land/empty"] = empty;
    Parsimmon2["fantasy-land/of"] = succeed;
    Parsimmon2.Binary = {
      bitSeq,
      bitSeqObj,
      byte,
      buffer: parseBuffer,
      encodedString,
      uintBE,
      uint8BE: uintBE(1),
      uint16BE: uintBE(2),
      uint32BE: uintBE(4),
      uintLE,
      uint8LE: uintLE(1),
      uint16LE: uintLE(2),
      uint32LE: uintLE(4),
      intBE,
      int8BE: intBE(1),
      int16BE: intBE(2),
      int32BE: intBE(4),
      intLE,
      int8LE: intLE(1),
      int16LE: intLE(2),
      int32LE: intLE(4),
      floatBE: floatBE(),
      floatLE: floatLE(),
      doubleBE: doubleBE(),
      doubleLE: doubleLE()
    };
    module.exports = Parsimmon2;
  }
});

// node_modules/.pnpm/@inlang+plugin@2.4.13_@sinclair+typebox@0.31.28/node_modules/@inlang/plugin/dist/customApis/app.inlang.ideExtension.js
var import_typebox = __toESM(require_typebox(), 1);
var MessageReferenceMatch = import_typebox.Type.Object({
  /**
   * The messages id.
   */
  messageId: import_typebox.Type.String(),
  /**
   * The position from where to where the reference can be found.
   */
  position: import_typebox.Type.Object({
    start: import_typebox.Type.Object({
      line: import_typebox.Type.Number(),
      character: import_typebox.Type.Number()
    }),
    end: import_typebox.Type.Object({
      line: import_typebox.Type.Number(),
      character: import_typebox.Type.Number()
    })
  })
});
var IdeExtensionConfigSchema = import_typebox.Type.Object({
  /**
   * Defines matchers for message references inside the code.
   *
   * @param args represents the data to conduct the search on
   * @returns a promise with matched message references
   */
  messageReferenceMatchers: import_typebox.Type.Array(import_typebox.Type.Function([
    import_typebox.Type.Object({
      documentText: import_typebox.Type.String()
    })
  ], import_typebox.Type.Promise(import_typebox.Type.Array(MessageReferenceMatch)))),
  /**
   * Defines the options to extract messages.
   */
  extractMessageOptions: import_typebox.Type.Array(import_typebox.Type.Object({
    /**
     * Function which is called, when the user finished the message extraction command.
     *
     * @param messageId is the message identifier entered by the user
     * @param selection is the text which was extracted
     * @returns the code which is inserted into the document
     */
    callback: import_typebox.Type.Function([
      import_typebox.Type.Object({
        messageId: import_typebox.Type.String(),
        selection: import_typebox.Type.String()
      })
    ], import_typebox.Type.Object({
      messageId: import_typebox.Type.String(),
      messageReplacement: import_typebox.Type.String()
    }))
  })),
  /**
   * An array of Visual Studio Code DocumentSelectors.
   *
   * The document selectors specify for which files/programming languages
   * (typescript, svelte, etc.) the extension should be activated.
   *
   * See https://code.visualstudio.com/api/references/document-selector
   */
  documentSelectors: import_typebox.Type.Optional(import_typebox.Type.Array(import_typebox.Type.Object({
    language: import_typebox.Type.Optional(import_typebox.Type.String())
  })))
});

// node_modules/.pnpm/@inlang+plugin@2.4.13_@sinclair+typebox@0.31.28/node_modules/@inlang/plugin/dist/interface.js
var import_typebox4 = __toESM(require_typebox(), 1);

// node_modules/.pnpm/@inlang+language-tag@1.5.1/node_modules/@inlang/language-tag/dist/interface.js
var import_typebox2 = __toESM(require_typebox(), 1);
var pattern = "^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?))(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*))$";
var LanguageTag = import_typebox2.Type.String({
  pattern,
  examples: ["en", "de", "en-US", "zh-Hans", "es-419"]
});

// node_modules/.pnpm/@inlang+translatable@1.3.1/node_modules/@inlang/translatable/dist/interface.js
var import_typebox3 = __toESM(require_typebox(), 1);
var Translatable = (type) => import_typebox3.Type.Union([type, import_typebox3.Type.Intersect([import_typebox3.Type.Object({ en: type }), import_typebox3.Type.Record(LanguageTag, type)])]);

// node_modules/.pnpm/@inlang+plugin@2.4.13_@sinclair+typebox@0.31.28/node_modules/@inlang/plugin/dist/interface.js
var Plugin = import_typebox4.Type.Object({
  id: import_typebox4.Type.String({
    pattern: "^plugin\\.([a-z][a-zA-Z0-9]*)\\.([a-z][a-zA-Z0-9]*(?:[A-Z][a-z0-9]*)*)$",
    examples: ["plugin.namespace.id"]
  }),
  displayName: Translatable(import_typebox4.Type.String()),
  description: Translatable(import_typebox4.Type.String()),
  /**
   * Tyepbox is must be used to validate the Json Schema.
   * Github discussion to upvote a plain Json Schema validator and read the benefits of Typebox
   * https://github.com/opral/monorepo/discussions/1503
   */
  settingsSchema: import_typebox4.Type.Optional(import_typebox4.Type.Object({}, { additionalProperties: true })),
  loadMessages: import_typebox4.Type.Optional(import_typebox4.Type.Any()),
  saveMessages: import_typebox4.Type.Optional(import_typebox4.Type.Any()),
  /**
   * @deprecated removed
   */
  detectedLanguageTags: import_typebox4.Type.Optional(import_typebox4.Type.Any()),
  addCustomApi: import_typebox4.Type.Optional(import_typebox4.Type.Any())
});

// node_modules/.pnpm/@inlang+message@2.1.0_@sinclair+typebox@0.31.28/node_modules/@inlang/message/dist/interface.js
var import_typebox5 = __toESM(require_typebox(), 1);
var Text = import_typebox5.Type.Object({
  type: import_typebox5.Type.Literal("Text"),
  value: import_typebox5.Type.String()
});
var VariableReference = import_typebox5.Type.Object({
  type: import_typebox5.Type.Literal("VariableReference"),
  name: import_typebox5.Type.String()
});
var Expression = import_typebox5.Type.Union([VariableReference]);
var Pattern = import_typebox5.Type.Array(import_typebox5.Type.Union([Text, Expression]));
var Variant = import_typebox5.Type.Object({
  languageTag: LanguageTag,
  /**
   * The number of keys in each variant match MUST equal the number of expressions in the selectors.
   *
   * Inspired by: https://github.com/unicode-org/message-format-wg/blob/main/spec/formatting.md#pattern-selection
   */
  // a match can always only be string-based because a string is what is rendered to the UI
  match: import_typebox5.Type.Array(import_typebox5.Type.String()),
  pattern: Pattern
});
var Message = import_typebox5.Type.Object({
  id: import_typebox5.Type.String(),
  alias: import_typebox5.Type.Record(import_typebox5.Type.String(), import_typebox5.Type.String()),
  /**
   * The order in which the selectors are placed determines the precedence of patterns.
   */
  selectors: import_typebox5.Type.Array(Expression),
  variants: import_typebox5.Type.Array(Variant)
});

// marketplace-manifest.json
var displayName = {
  en: "t-function JSX hybrid matcher"
};
var description = {
  en: "t-function JSX hybrid matcher"
};

// src/settings.ts
var import_typebox6 = __toESM(require_typebox(), 1);
var PluginSettings = import_typebox6.Type.Object({
  preferredTfuncName: import_typebox6.Type.Optional(import_typebox6.Type.String({
    title: "Preferred t-function name",
    description: 'The t("key") function name to use when extracting a new string.',
    default: "t",
    examples: ["t", "translate", "i18n.t"]
  })),
  recognizedTfuncNames: import_typebox6.Type.Optional(import_typebox6.Type.Array(import_typebox6.Type.String(), {
    title: "Recognized t-function names",
    description: 'Array of recognized t("key") function names (to show inline previews of messages)',
    default: ["t"],
    examples: ["t", "translate", "i18n.t"]
  })),
  recognizedJSXAttributes: import_typebox6.Type.Optional(import_typebox6.Type.Array(import_typebox6.Type.String(), {
    title: "Recognized JSX attributes",
    description: "which JSX attributes should be recognized as translate ones",
    default: [],
    examples: ["tx", "subTx"]
  }))
});

// src/ideExtension/messageReferenceMatchers.ts
var import_parsimmon = __toESM(require_parsimmon(), 1);
function createMessageReferenceParser(translateFunctionNames) {
  const parser = import_parsimmon.default.createLanguage({
    // The entry point for message reference matching.
    //
    // 1. Match a t function call or any other character.
    // 2. Match as many of these as possible.
    // 3. Filter out any non-object matches.
    entry: (r) => {
      return import_parsimmon.default.alt(r.FunctionCall, import_parsimmon.default.any).many().map((matches) => {
        return matches.filter((match) => typeof match === "object");
      });
    },
    // A string literal is either a single or double quoted string
    stringLiteral: (r) => {
      return import_parsimmon.default.alt(r.doubleQuotedString, r.singleQuotedString);
    },
    // Double quoted string literal parser
    //
    // 1. Start with a double quote.
    // 2. Then match any character that is not a double quote.
    // 3. End with a double quote.
    doubleQuotedString: () => {
      return import_parsimmon.default.string('"').then(import_parsimmon.default.regex(/[^"]*/)).skip(import_parsimmon.default.string('"'));
    },
    // Single quoted string literal parser
    //
    // 1. Start with a single quote.
    // 2. Then match any character that is not a single quote.
    // 3. End with a single quote.
    singleQuotedString: () => {
      return import_parsimmon.default.string("'").then(import_parsimmon.default.regex(/[^']*/)).skip(import_parsimmon.default.string("'"));
    },
    // Parser for t function calls
    FunctionCall: function(r) {
      return import_parsimmon.default.seqMap(
        import_parsimmon.default.regex(/[^a-zA-Z0-9]/),
        // no preceding letters or numbers
        import_parsimmon.default.alt(...translateFunctionNames.map(import_parsimmon.default.string)),
        // support multiple translate function
        import_parsimmon.default.string("("),
        // then an opening parenthesis
        import_parsimmon.default.index,
        // start position of the message id
        r.stringLiteral,
        // message id
        import_parsimmon.default.index,
        // end position of the message id
        import_parsimmon.default.regex(/[^)]*/),
        // ignore the rest of the function call
        import_parsimmon.default.string(")"),
        // end with a closing parenthesis
        (_, __, ___, start, messageId, end) => {
          return {
            messageId,
            position: {
              start: {
                line: start.line,
                character: start.column
              },
              end: {
                line: end.line,
                character: end.column
              }
            }
          };
        }
      );
    }
  });
  return parser;
}
function parse(sourceCode, settings) {
  try {
    const parser = createMessageReferenceParser(settings?.recognizedTfuncNames ?? ["t"]);
    return parser.entry.tryParse(sourceCode);
  } catch {
    return [];
  }
}

// src/ideExtension/config.ts
var ideExtensionConfig = (settings) => ({
  "app.inlang.ideExtension": {
    messageReferenceMatchers: [
      async (args) => {
        return parse(args.documentText, settings);
      }
    ],
    extractMessageOptions: [
      {
        callback: (args) => ({
          messageId: args.messageId,
          messageReplacement: `"${args.messageId}"`
        })
      },
      {
        callback: (args) => ({
          messageId: args.messageId,
          messageReplacement: `${settings?.preferredTfuncName ?? "t"}("${args.messageId}")`
        })
      },
      {
        callback: (args) => ({
          messageId: args.messageId,
          messageReplacement: `{${settings?.preferredTfuncName ?? "t"}("${args.messageId}")}`
        })
      }
    ],
    documentSelectors: [
      { language: "typescriptreact" },
      { language: "javascript" },
      { language: "typescript" },
      { language: "svelte" },
      { language: "astro" },
      { language: "vue" }
    ]
  }
});

// src/plugin.ts
var id = "plugin.minibits.inlangmatcher";
var plugin = {
  id,
  displayName,
  description,
  settingsSchema: PluginSettings,
  addCustomApi: ({ settings }) => ideExtensionConfig(settings["plugin.minibits.inlangmatcher"])
};

// src/index.ts
var src_default = plugin;
export {
  src_default as default
};
