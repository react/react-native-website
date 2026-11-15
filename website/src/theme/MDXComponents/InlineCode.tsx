import React from 'react';
import Link from '@docusaurus/Link';

// Note: this component is a custom React-Native-Website feature

const MarkdownInlineCodePrefix = 'md ';

export default function InlineCode(props) {
  if (
    typeof props.children === 'string' &&
    props.children.startsWith(MarkdownInlineCodePrefix)
  ) {
    return (
      <MarkdownInlineCode
        {...props}
        children={props.children.slice(MarkdownInlineCodePrefix.length)}
      />
    );
  }
  return <code {...props} />;
}

// An inline code block with some basic Markdown support
// Currently only supports links, which should be good enough...
// To enable Markdown support, use the "`md " prefix
// Syntax example: `md ({nativeEvent: [PressEvent](pressevent)})`
const MarkdownInlineCode = React.memo(function MarkdownInlineCodeInner(
  props: React.PropsWithChildren
) {
  const children = linkify(props.children);
  return <code {...props} children={children} />;
});

// Gives the ability to use basic Markdown links inside inline code blocks
// We use RegExp because a full Markdown parser would be quite heavy
// See https://github.com/react/react-native-website/pull/3807
function linkify(input) {
  // Inspired by https://github.com/gakimball/transform-markdown-links
  // Thank you: http://stackoverflow.com/a/32382702 (with some modifications)
  const linkRegExp = /(?<link>\[(?<text>[^\]]+)?\]\((?<url>[^)]+)\))/g;
  const linkSplitRegExp = /\[[^\]]+?\]\([^)]+\)/g;

  const links = [];
  let match;
  while ((match = linkRegExp.exec(input)) !== null) {
    const link = match.groups.link;
    const text = match.groups.text;
    const url = match.groups.url;
    if (url.endsWith('.md') || url.endsWith('.mdx')) {
      throw new Error(
        "Markdown links inside code blocks can't link using a filename extensions. Problematic link: " +
          link
      );
    }
    links.push({link, text, url});
  }

  return input.split(linkSplitRegExp).map((text, i) => {
    return (
      <React.Fragment key={i}>
        {text}
        {links[i] ? <Link to={links[i].url}>{links[i].text}</Link> : null}
      </React.Fragment>
    );
  });
}
