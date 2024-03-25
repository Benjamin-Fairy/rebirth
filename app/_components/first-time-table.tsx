'use client';

import React from 'react';
import { Icon, Table, Text, Tooltip, View } from 'reshaped';
import { useBirth } from '@/lib/store/useBirth';
import { CircleHelp } from 'lucide-react';

function FirstTimeTable() {
  const birthResults = useBirth(state => state.birthResults);

  // Remove duplicates
  const uniqueProvinces = Array.from(
    new Set(birthResults.map(item => item.province))
  );

  const uniqueResults = uniqueProvinces.map(province => {
    const firstAppearanceIndex = birthResults.findIndex(
      item => item.province === province
    );
    return {
      province,
      firstAppearance: firstAppearanceIndex + 1
    };
  });

  uniqueResults.sort((a, b) => b.firstAppearance - a.firstAppearance);

  return (
    <View gap={4}>
      <View backgroundColor="neutral-faded" className="rounded-xl">
        <Table border columnBorder>
          <Table.Row highlighted>
            <Table.Heading padding={1.5}>
              <Text align="center">省份/地区</Text>
            </Table.Heading>
            <Table.Heading padding={1.5}>
              <View align="center">
                <Tooltip text="需要多少次才能投胎到这个地方" position="top">
                  {attributes => (
                    <View direction="row" align="center" gap={1}>
                      <Text align="center">第一次出现</Text>
                      <Icon svg={<CircleHelp />} attributes={attributes} />
                    </View>
                  )}
                </Tooltip>
              </View>
            </Table.Heading>
          </Table.Row>
          {uniqueResults.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell padding={1}>
                <Text align="center">{item.province}</Text>
              </Table.Cell>
              <Table.Cell padding={1}>
                <Text align="center">{item.firstAppearance}</Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </View>
    </View>
  );
}

export default FirstTimeTable;
