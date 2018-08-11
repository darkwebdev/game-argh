const { expect } = require('chai');
const { compile } = require('../build/game');

describe('Templating engine', () => {
  it('should return a function and compile to a function', () => {
    expect(compile).to.be.a('function');
    expect(compile('')).to.be.a('function');
  });

  it('should render without vm', () => {
    const template = '<div></div>';

    expect(compile(template)()).to.equal(template);
  });

  it('should render escaped quotes', () => {
    const template = '<div class=\'class\' id=\"id\">';
    const html = `<div class='class' id="id">`;

    expect(compile(template)()).to.equal(html);
  });

  it('should render with special chars replaced', () => {
    const template = '<div>\n\t\r</div>';
    const html = '<div>   </div>';

    expect(compile(template)()).to.equal(html);
  });

  it('should render with empty brackets collapsed', () => {
    const template = '<div><# #></div>';
    const html = '<div></div>';

    expect(compile(template)()).to.equal(html);
  });

  it('should render vm properties', () => {
    const template = '<div><#= a #></div>';
    const vm = { a: 1 };
    const html = '<div>1</div>';

    expect(compile(template)(vm)).to.equal(html);
  });

  it('should render iterations', () => {
    const template = `<div>
<# items.forEach((item, i) => { #>
  <span><#= i #> - <#= item #></span>
<# }); #>
    </div>`;
    const vm = { items: [ 'item1', 'item2' ] };
    const html = '<div>    <span>0 - item1</span>    <span>1 - item2</span>      </div>';

    expect(compile(template)(vm)).to.equal(html);
  });

  it('should render with conditional expressions', () => {
    const template = '<div><#= (data.a || "no-data") #> <# if (data.a) { #>if-works<# } else { #>else-works<# } #></div>';

    expect(compile(template)()).to.equal('<div>no-data else-works</div>');
    expect(compile(template)({ a: 'data' })).to.equal('<div>data if-works</div>');
  });

  it('should render with function calls', () => {
    const template = '<div><#= fn() #></div>';
    const html = `<div>output</div>`;
    const vm = { fn: () => 'output' };

    expect(compile(template)(vm)).to.equal(html);
  });
});
